export const notificationManager = {
  getNotificationList: async function () {
    const response = await fetch('http://localhost:4000/notification');

    if (!response.ok) throw new Error('Failed to fetch notification list' + response.statusText);

    return await response.json();
  }
};
