function squareCollision(s1, s2) {
  if (s1.x <= s2.x + s2.w && s1.x + s1.w >= s2.x && s1.y <= s2.y + s2.h && s1.y + s1.h >= s2.y) {
    return true;
  } else {
    return false;
  }
}
