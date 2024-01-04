export const environment = {
    production: false,
    // END_POINT: "http://3.84.126.3:3000/api",
    END_POINT: "http://127.0.0.1:3000/api",
    PROPERTY_TYPES: [
        { key: 'ROOM', label: 'Room' },
        { key: 'HOUSE', label: 'House' },
        { key: 'FLAT', label: 'Flat' },
        { key: 'COMMERCIAL_SPACE', label: 'Commercial Space' }
    ],
    OFFER_TYPES: [
        { label: 'Rent', key: "RENT" },
        { label: 'Sell', key: "SELL" }
    ]
};
