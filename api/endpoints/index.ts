export const baseUrl = process.env.NEXT_APP_BASE_URL;
export const baseUrlApi = `${process.env.NEXT_APP_BASE_URL}/api`;
export const baseUrlMedia = process.env.NEXT_APP_BASE_URL;

// api doc => https://militarymoves-admin.dedicateddevelopers.us/apidoc

export const mediaUrl = (url: string) => {
  return `${baseUrlMedia}/${url}`;
};

export const endpoints = {
  user: {
    login: "/user/login",
    register: "/user/register",
    profile: "/user/profile",
    update_profile: "/user/update-profile",
    change_password: "/user/change-password",
    get_public_profile: "/user/get-user"
  },
  facility: {
    get_facility: "/facility"
  },
  lanes: {
    get_lanes: "/lane/get-lanes"
  },
  bookings: {
    get_bookings_for_filter: "/bookings/get-bookings-for-filter"
  },
  membership: {
    get_all: "/membership"
  },
  season_pass: {
    get_all: "/season-pass"
  },
  payments: {
    create_subscription: "/payments/create-subscription",
    change_subscription: "/payments/change-subscription",
    generate_payment_intent: "/payments/generate-payment-intent",
    remove_pending_bookings: "/payments/remove-pending-bookings"
  },
  purchased_membership: {
    current_subscription: "/purchased-membership/get-membership-for-user"
  },
  purchased_season_pass: {
    current_plan: "/purchased-season-pass/get-season-pass-for-user"
  }
};

export const sucessNotificationEndPoints: string[] = [
  endpoints.user.login,
  endpoints.user.register,
  endpoints.payments.change_subscription,
  endpoints.user.update_profile,
  endpoints.user.change_password
];
