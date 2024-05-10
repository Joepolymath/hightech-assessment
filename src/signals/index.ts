import process from 'process';

const init = (closeFunc: () => void) => async () => {
  try {
    await closeFunc();
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
};

export default {
  init,
};
