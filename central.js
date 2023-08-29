function initMap() {
    // Get the map element by its ID
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15 // Adjust the zoom level as needed
    });

    // Check if the browser supports geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // Center the map on the user's live location
                map.setCenter(userLocation);

                // Create a marker for the user's live location
                const userMarker = new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "Your Current Location"
                });

                // Define an array of location markers for this page
                const locationMarkers = [
                    { lat: 51.5133, lng: -0.1277, name: "Location 1" },
                    { lat: 51.5219, lng: -0.1106, name: "Location 2" },
                    // Add more location markers here...
                ];

                // Add markers for specific locations
                locationMarkers.forEach(function(location) {
                    const marker = new google.maps.Marker({
                        position: { lat: location.lat, lng: location.lng },
                        map: map,
                        title: location.name
                    });
                });
            },
            function(error) {
                console.error("Error getting user's location: ", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}