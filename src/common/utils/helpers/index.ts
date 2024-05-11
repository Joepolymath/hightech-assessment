function getRetryAfterSeconds(msBeforeNext: number) {
  return Math.round(msBeforeNext / 1000) || 1;
}

module.exports = {
  getRetryAfterSeconds,
};
