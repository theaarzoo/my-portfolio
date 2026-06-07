// oneko.js: https://github.com/adryd325/oneko.js

(async function oneko() {
  const scriptEl = document.getElementById('oneko-script');
  const fallbackVariants = [
    { id: 'mishubu', label: 'mishubu' },
    { id: 'dog', label: 'Dog' },
    { id: 'tora', label: 'Tora' },
    { id: 'maia', label: 'Maia' },
  ];

  const variants = (() => {
    try {
      const raw = scriptEl?.getAttribute('data-variants');

      if (!raw) {
        return fallbackVariants;
      }

      const parsed = JSON.parse(raw);

      if (!Array.isArray(parsed) || parsed.length === 0) {
        return fallbackVariants;
      }

      return parsed
        .filter(
          (item) =>
            item &&
            typeof item.id === 'string' &&
            typeof item.label === 'string',
        )
        .map((item) => ({
          id: item.id,
          label: item.label,
        }));
    } catch (e) {
      console.error(e);
      return fallbackVariants;
    }
  })();

  const variantIds = variants.map((item) => item.id);
  const nekoEl = document.createElement('div');

  let nekoPosX = 32,
    nekoPosY = 32,
    mousePosX = 0,
    mousePosY = 0,
    frameCount = 0,
    idleTime = 0,
    idleAnimation = null,
    idleAnimationFrame = 0,
    forceSleep = false,
    grabbing = false,
    grabStop = true,
    nudge = false,
    variant = 'mishubu';

  function parseLocalStorage(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(`oneko:${key}`));
      return typeof value === typeof fallback ? value : fallback;
    } catch (e) {
      console.error(e);
      return fallback;
    }
  }

  function getAssetSrc(id) {
    return id === 'mishubu' ? '/oneko/oneko.gif' : `/oneko/oneko-${id}.gif`;
  }

  function clampX(x) {
    return Math.min(Math.max(16, x), window.innerWidth - 16);
  }

  function clampY(y) {
    return Math.min(Math.max(16, y), window.innerHeight - 16);
  }

  function getState() {
    return {
      sleeping: forceSleep,
      variant,
      variants: variants.map((item) => ({
        ...item,
        src: getAssetSrc(item.id),
      })),
    };
  }

  function emitState() {
    window.dispatchEvent(
      new CustomEvent('oneko:state', {
        detail: getState(),
      }),
    );
  }

  function syncSleepTarget() {
    mousePosX = clampX(nekoPosX);
    mousePosY = clampY(nekoPosY);
  }

  const nekoSpeed = 10,
    spriteSets = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [
        [-5, 0],
        [-6, 0],
        [-7, 0],
      ],
      scratchWallN: [
        [0, 0],
        [0, -1],
      ],
      scratchWallS: [
        [-7, -1],
        [-6, -2],
      ],
      scratchWallE: [
        [-2, -2],
        [-2, -3],
      ],
      scratchWallW: [
        [-4, 0],
        [-4, -1],
      ],
      tired: [[-3, -2]],
      sleeping: [
        [-2, 0],
        [-2, -1],
      ],
      N: [
        [-1, -2],
        [-1, -3],
      ],
      NE: [
        [0, -2],
        [0, -3],
      ],
      E: [
        [-3, 0],
        [-3, -1],
      ],
      SE: [
        [-5, -1],
        [-5, -2],
      ],
      S: [
        [-6, -3],
        [-7, -2],
      ],
      SW: [
        [-5, -3],
        [-6, -1],
      ],
      W: [
        [-4, -2],
        [-4, -3],
      ],
      NW: [
        [-1, 0],
        [-1, -1],
      ],
    };

  function updateVariant(next) {
    if (!variantIds.includes(next)) {
      return;
    }

    variant = next;
    localStorage.setItem('oneko:variant', JSON.stringify(variant));
    nekoEl.style.backgroundImage = `url('${getAssetSrc(variant)}')`;
    emitState();
  }

  function openPicker() {
    window.dispatchEvent(new CustomEvent('oneko:open-picker'));
  }

  function nextAvatar() {
    const idx = variantIds.indexOf(variant);
    const next = variantIds[(idx + 1) % variantIds.length] ?? variantIds[0];

    if (next) {
      updateVariant(next);
    }
  }

  function setSleep(next) {
    forceSleep = next;
    nudge = false;
    localStorage.setItem('oneko:forceSleep', JSON.stringify(forceSleep));

    if (forceSleep) {
      syncSleepTarget();
    } else {
      resetIdleAnimation();
    }

    emitState();
  }

  function toggleSleep() {
    setSleep(!forceSleep);
  }

  function create() {
    variant = parseLocalStorage('variant', 'mishubu');

    if (!variantIds.includes(variant)) {
      variant = variantIds[0] ?? 'mishubu';
    }

    nekoEl.id = 'oneko';
    nekoEl.style.width = '32px';
    nekoEl.style.height = '32px';
    nekoEl.style.position = 'fixed';
    nekoEl.style.backgroundImage = `url('${getAssetSrc(variant)}')`;
    nekoEl.style.imageRendering = 'pixelated';
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = '99';

    document.body.appendChild(nekoEl);

    window.addEventListener('mousemove', (e) => {
      if (forceSleep) return;

      mousePosX = e.clientX;
      mousePosY = e.clientY;
    });

    window.addEventListener('resize', () => {
      if (forceSleep) {
        syncSleepTarget();
      }
    });

    nekoEl.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;

      grabbing = true;
      let startX = e.clientX;
      let startY = e.clientY;
      let startNekoX = nekoPosX;
      let startNekoY = nekoPosY;
      let grabTimer;

      const mousemove = (moveEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        if (absX > absY && absX > 10) {
          setSprite(dx > 0 ? 'scratchWallW' : 'scratchWallE', frameCount);
        } else if (absY > absX && absY > 10) {
          setSprite(dy > 0 ? 'scratchWallN' : 'scratchWallS', frameCount);
        }

        if (
          grabStop ||
          absX > 10 ||
          absY > 10 ||
          Math.sqrt(dx ** 2 + dy ** 2) > 10
        ) {
          grabStop = false;
          clearTimeout(grabTimer);
          grabTimer = setTimeout(() => {
            grabStop = true;
            nudge = false;
            startX = moveEvent.clientX;
            startY = moveEvent.clientY;
            startNekoX = nekoPosX;
            startNekoY = nekoPosY;
          }, 150);
        }

        nekoPosX = startNekoX + moveEvent.clientX - startX;
        nekoPosY = startNekoY + moveEvent.clientY - startY;
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
      };

      const mouseup = () => {
        grabbing = false;
        nudge = true;
        resetIdleAnimation();
        window.removeEventListener('mousemove', mousemove);
        window.removeEventListener('mouseup', mouseup);
      };

      window.addEventListener('mousemove', mousemove);
      window.addEventListener('mouseup', mouseup);
    });

    nekoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      openPicker();
    });

    nekoEl.addEventListener('dblclick', toggleSleep);

    window.onekoController = {
      getState,
      nextAvatar,
      openPicker,
      setVariant: updateVariant,
      toggleSleep,
    };

    emitState();
    window.onekoInterval = setInterval(frame, 100);
  }

  function getSprite(name, frame) {
    return spriteSets[name][frame % spriteSets[name].length];
  }

  function setSprite(name, frame) {
    const sprite = getSprite(name, frame);
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;

    if (
      !forceSleep &&
      idleTime > 10 &&
      Math.floor(Math.random() * 200) === 0 &&
      idleAnimation == null
    ) {
      const idleAnimations = ['sleeping', 'scratchSelf'];

      if (nekoPosX < 32) {
        idleAnimations.push('scratchWallW');
      }
      if (nekoPosY < 32) {
        idleAnimations.push('scratchWallN');
      }
      if (nekoPosX > window.innerWidth - 32) {
        idleAnimations.push('scratchWallE');
      }
      if (nekoPosY > window.innerHeight - 32) {
        idleAnimations.push('scratchWallS');
      }

      idleAnimation =
        idleAnimations[Math.floor(Math.random() * idleAnimations.length)];
    }

    if (forceSleep) {
      idleAnimation = 'sleeping';
    }

    switch (idleAnimation) {
      case 'sleeping':
        if (idleAnimationFrame < 8 && nudge && forceSleep) {
          setSprite('idle', 0);
          break;
        } else if (nudge) {
          nudge = false;
          resetIdleAnimation();
        }

        if (idleAnimationFrame < 8) {
          setSprite('tired', 0);
          break;
        }

        setSprite('sleeping', Math.floor(idleAnimationFrame / 4));

        if (idleAnimationFrame > 192 && !forceSleep) {
          resetIdleAnimation();
        }
        break;
      case 'scratchWallN':
      case 'scratchWallS':
      case 'scratchWallE':
      case 'scratchWallW':
      case 'scratchSelf':
        setSprite(idleAnimation, idleAnimationFrame);

        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite('idle', 0);
        return;
    }

    idleAnimationFrame += 1;
  }

  function frame() {
    frameCount += 1;

    if (grabbing) {
      if (grabStop) {
        setSprite('alert', 0);
      }
      return;
    }

    const dx = nekoPosX - mousePosX;
    const dy = nekoPosY - mousePosY;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);

    if (forceSleep && Math.abs(dy) < nekoSpeed && Math.abs(dx) < nekoSpeed) {
      nekoPosX = mousePosX;
      nekoPosY = mousePosY;
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
      idle();
      return;
    }

    if ((distance < nekoSpeed || distance < 48) && !forceSleep) {
      idle();
      return;
    }

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite('alert', 0);
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    let dir = dy / distance > 0.5 ? 'N' : '';
    dir += dy / distance < -0.5 ? 'S' : '';
    dir += dx / distance > 0.5 ? 'W' : '';
    dir += dx / distance < -0.5 ? 'E' : '';

    setSprite(dir, frameCount);

    nekoPosX -= (dx / distance) * nekoSpeed;
    nekoPosY -= (dy / distance) * nekoSpeed;
    nekoPosX = clampX(nekoPosX);
    nekoPosY = clampY(nekoPosY);
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }

  create();

  if (parseLocalStorage('forceSleep', false)) {
    setSleep(true);
  }
})();
