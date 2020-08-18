function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function extractTouchPoint(e) {
  const targetValue = e && e.changedTouches && e.changedTouches[0];
  if (targetValue) {
    return {
      x: targetValue.clientX,
      y: targetValue.clientY
    };
  } else {
    return {
      x: 0,
      y: 0
    };
  }
}

export { random, extractTouchPoint };
