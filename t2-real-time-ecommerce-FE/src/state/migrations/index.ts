const version = 5;

const migrations = {
  [version]: (state: any) => {
    return {
      ...state,
      user: {
        ...state.user,
        checkPage: [],
        achievement502: 234,
        loading: false,
        currentUser: {},
        newUserInfo: null,
        accessToken: null,
        requestId: '',
        phone: '',
        verifyOtpStatus: false,
      },
    }
  },
};

export { migrations, version };