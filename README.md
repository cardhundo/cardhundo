# CarDhundo v1

A premium static front-end starter for CarDhundo.

## Included
- Premium responsive homepage
- 6-step car finder
- Budget, fuel, body type, transmission, feature and usage filters
- Variant-aware starter data model
- Match scoring
- Car result cards
- Compare action stored in localStorage
- Car detail popup/page
- Promotion / advertising slot
- Category filters
- Official-source links
- Mobile responsive UI
- No framework and no paid dependency

## Important data rule
Do not present a feature, price, variant or image as "official" unless it has been verified against a current manufacturer source.

The starter dataset is intentionally small. It is an architecture demo, not a claim that it contains every Indian car/variant.

## Official imagery
The `assets/cars/` folder is intentionally empty. Add only images that CarDhundo is licensed/authorized to use, or images supplied under a compatible license. Do not scrape or hotlink manufacturer imagery without permission.

Expected filenames:
- tata-punch.jpg
- hyundai-exter.jpg
- hyundai-venue.jpg
- hyundai-creta.jpg

If you don't have licensed images yet, the UI will still work and show the model name.

## How to expand to all brands
Keep each model as a JSON/JS object:
brand -> model -> variant -> powertrain -> features -> source URL -> image assets.

Recommended future schema:
{
  id, brand, model, body,
  fuelTypes: [],
  transmissions: [],
  variants: [
    {
      name, fuel, transmission, price,
      features: [],
      safety: [],
      dimensions: {},
      engine: {},
      sourceUrls: [],
      images: {front, side, rear, interior, dashboard, boot}
    }
  ]
}

## Production roadmap
1. Move cars.js into a real database/CMS.
2. Add an admin panel for verification and update dates.
3. Store source URL + checkedAt + sourceType for every data field.
4. Add city-wise pricing and on-road calculators.
5. Add real image licensing/asset management.
6. Add detailed comparison tables.
7. Add dealer leads and promotions.
8. Add analytics.
9. Add a server-side API before deploying a very large dataset.

## Cloudflare
This folder can be deployed as a static site on Cloudflare Pages/Workers. For a large verified dataset, use a database/API rather than putting thousands of records in one JS file.
