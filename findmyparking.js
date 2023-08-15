function initMap() {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                const mapOptions = {
                    zoom: 15,
                    center: userLocation
                };

                // Create a new map centered on the user's location
                const map = new google.maps.Map(document.getElementById("map"), mapOptions);

                // Create a marker to show the user's location
                const marker = new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "Your Current Location"
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