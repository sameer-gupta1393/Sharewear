
import useConversation from "../../zustand/useConversation";

export const getLocation = () => {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        useConversation.setState({ location: { latitude, longitude } });
        // Update the location state in Zustand store
      },
      (error) => {
        console.error('Error getting location:', error);

      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
};
