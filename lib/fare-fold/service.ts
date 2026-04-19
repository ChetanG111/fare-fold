const Amadeus = require('amadeus');

// TODO: Replace with your own Amadeus API credentials
const amadeus = new Amadeus({
  clientId: 'YOUR_AMADEUS_API_KEY',
  clientSecret: 'YOUR_AMADEUS_API_SECRET'
});

export async function searchAirports(keyword: string) {
    try {
        const response = await amadeus.referenceData.locations.get({
            keyword: keyword,
            subType: 'AIRPORT',
        });
        return response.data;
    } catch (error) {
        console.error('Error searching airports with Amadeus:', error);
        return [];
    }
}

export async function searchAndBookFlight(flightRequest: any) {
  console.log('Searching for flight with Amadeus:', flightRequest);

  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: flightRequest.origin,
      destinationLocationCode: flightRequest.destination,
      departureDate: flightRequest.departureDate,
      adults: '1'
    });

    console.log('Amadeus API response:', response.data);

    if (!response.data || response.data.length === 0) {
      return {
        success: false,
        error: 'No flights found matching your criteria.'
      };
    }

    const flightOffer = response.data[0];

    return {
      success: true,
      bookingId: `ff-booking-${Math.random().toString(36).substring(2, 10)}`,
      flightOffer: flightOffer
    };
  } catch (error) {
    console.error('Error searching for flight with Amadeus:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
