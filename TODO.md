# Vehicle Module Backend Implementation TODO

## Overview
Breakdown of the approved plan to implement missing "Add New Listing" functionality. Steps are sequential: Start with types/validations, then helpers, services (core logic), controllers (handlers), routes (endpoints). After each major step, update this file with progress. Test incrementally.

## Steps

### 1. Update Types and Validations (vehicles.types.ts)
   - [x] Add interfaces: CreateListingInput (with listingType: 'car'|'bike'|'haulage'|'spare_part', vehicleData: union type for CarInput/BikeInput/etc., features: array of {featureId: number, value?: string}, media: array of files (handled in controller), keywords: string[], discounts: array of DiscountInput).
   - [x] Add UpdateListingInput for partials (e.g., add features/media).
   - [x] Add Zod schemas: createListingSchema (validate required fields per type, e.g., body_type for car/haulage, fuel_type enum, features array max 50, keywords unique/max 20, discounts value >0).
   - [x] Add schemas for sub-endpoints: addFeaturesSchema, uploadMediaSchema, createDiscountSchema.
   - [x] Export all new types/schemas.
   - **Dependencies**: None new.
   - **Testing**: Validate sample payloads with Zod.parse() in console.

### 2. Update Helpers (vehicles.helpers.ts)
   - [x] Add processMediaFiles(files: Express.Multer.File[], listingId: number): Promise<Media[]>. Save to uploads/, create Media entries (file_type: 'image'|'video', dimensions via sharp if added, set is_primary for first, sort_order).
   - [x] Add geocodeLocation(location: string): Promise<{lat: number, long: number}> (use placeholder or integrate google-maps-services-js if installed).
   - [x] Add generateKeywords(title: string, description: string): string[] (simple split/extract common terms, e.g., ['family', 'car', 'hybrid'] from text).
   - [x] Add validateVehicleType(listingType: string, data: any): void (throw if missing fields, e.g., no engine_capacity for spare_part).
   - [x] Add authenticateListingOwner(userId: number, listingId: number): Promise<boolean> (check Listing.user_id).
   - [x] Update existing helpers if conflicts (e.g., extend upload logic).
   - **Dependencies**: Import Media model; consider adding "sharp" to package.json for image processing.
   - **Testing**: Unit test helpers (e.g., mock files, run generateKeywords on sample desc).

### 3. Implement Services (vehicles.services.ts)
   - [x] Add createListing(userId: number, data: CreateListingInput & {files?: Express.Multer.File[]}): Use sequelize.transaction(): Create Listing (status: 'draft'), create subtype (switch on listingType, e.g., Car.create({...vehicleData})), bulkCreate ListingFeature for features, processMediaFiles for gallery, bulkCreate Keyword (use generateKeywords if empty), bulkCreate Discount for offers. Geocode location. If all success, optional set 'pending' and sendEmail('Listing submitted'). Return populated Listing (include subtype, media, features, etc.).
   - [x] Add updateListing(userId: number, listingId: number, data: UpdateListingInput & {files?: Express.Multer.File[]}): Similar transaction for partials (e.g., add to existing arrays).
   - [x] Add getUserListings(userId: number, query?: {type?: string, status?: string}): Query Listing where user_id, include polymorphic subtype (use where: {listing_type: type} for specific), media (limit 5), features/keywords/discounts.
   - [x] Add getListingById(listingId: number, includeOwner?: boolean): Full fetch with all associations.
   - [x] Add deleteListing(userId: number, listingId: number): Check ownership, destroy Listing (cascade deletes associations/media).
   - [x] Add addListingFeatures(listingId: number, features: array): Bulk create ListingFeature.
   - [x] Add addListingMedia(listingId: number, files: array): Call processMediaFiles.
   - [x] Add createListingDiscount(listingId: number, discountData: any): Create Discount, update listing price if needed.
   - [x] Add submitListing(listingId: number, userId: number): Set status 'pending', send approval email.
   - [ ] Refactor legacy createVehicle: Map to new createListing or mark as deprecated.
   - [ ] Extend getVehicles to query Listings (union across types).
   - **Dependencies**: Import all models, helpers, sequelize.transaction.
   - **Testing**: Mock DB, test createListing with sample car data (verify associations created).

### 4. Implement Controllers (vehicles.controllers.ts)
   - [x] Add createListingController(req: Request, res: Response): Auth userId, parse req.body (validated), handle req.files for media, call createListing, return {id, ...listing}.
   - [x] Add updateListingController(req: Request, res: Response): Ownership check, handle files, call updateListing.
   - [x] Add getListingsController(req: Request, res: Response): If auth, filter by user; else public. Call getUserListings or public variant, paginate.
   - [x] Add getListingController(req: Request, res: Response): Call getListingById(parseInt(req.params.id)).
   - [x] Add deleteListingController(req: Request, res: Response): Auth, call deleteListing.
   - [x] Add addFeaturesController(req: Request, res: Response): POST /listings/:id/features, validate, call addListingFeatures.
   - [x] Add uploadMediaController(req: Request, res: Response): POST /listings/:id/media, multer, call addListingMedia.
   - [x] Add createDiscountController(req: Request, res: Response): POST /listings/:id/discounts, validate, call createListingDiscount.
   - [x] Add submitListingController(req: Request, res: Response): POST /listings/:id/submit, call submitListing.
   - [x] Use existing errorResponse/successResponse; add middleware for ownership.
   - **Dependencies**: Import new services/schemas, multer types.
   - **Testing**: Mock req/res, test handlers return correct responses.

### 5. Update Routes (vehicles.routes.ts)
   - [x] Add POST `/listings` (authenticate, multer.array('media', 20) for gallery/videos, createListingController).
   - [x] Add PUT `/listings/:id` (authenticate, multer.array('media', 10), updateListingController).
   - [x] Add GET `/listings` (optional authenticate for user filter, getListingsController).
   - [x] Add GET `/listings/:id` (getListingController).
   - [x] Add DELETE `/listings/:id` (authenticate, deleteListingController).
   - [x] Add POST `/listings/:id/features` (authenticate, addFeaturesController).
   - [x] Add POST `/listings/:id/media` (authenticate, multer.array('media', 10), uploadMediaController).
   - [x] Add POST `/listings/:id/discounts` (authenticate, createDiscountController).
   - [x] Add POST `/listings/:id/submit` (authenticate, submitListingController).
   - [x] Add middleware: authenticateListingOwner for owned routes.
   - [x] Deprecate/update legacy /vehicles to /listings.
   - [x] Update multer config: Allow video/mime types (e.g., video/mp4), increase limits if needed.
   - **Dependencies**: Import new controllers, create authenticateListingOwner middleware.
   - **Testing**: Use Postman to hit new routes, verify 200/401/etc.

### 6. Module Integration and Finalization (index.ts, loaders)
   - [x] Update src/modules/vehicles/index.ts: Export new services/controllers (e.g., export * from './vehicles.services').
   - [x] Ensure src/loaders/database.ts loads all models (add Listing, Car, etc. if missing).
   - [x] Add to src/loaders/express.ts: Mount new routes if not already (router.use('/api/vehicles', vehiclesRoutes)).
   - **Dependencies**: None.
   - **Testing**: Restart server, check no import errors.

### 7. Testing and Verification
   - [ ] Run migrations/seeders: npx sequelize-cli db:migrate; seed Features (e.g., ABS, Bluetooth) and Categories (body types, makes).
   - [ ] Unit/Integration Tests: Add to __tests__ (if exists) or manual: Curl POST /listings with JSON + files, verify DB (e.g., select * from listings join cars).
   - [ ] Edge Cases: Invalid type, max media (20?), duplicate keywords, discount > price, unauth access.
   - [ ] Full Flow: Create draft, add features/media stepwise, submit → pending, admin approve.
   - [ ] Refactor Legacy: Update existing /vehicles to use listings; remove if not needed.
   - [ ] Performance: Index queries; limit includes.
   - **Dependencies**: Postman collection (update Bloomzon Project.postman_collection.json).
   - **Command**: npm run dev to start, test endpoints.

## Progress Tracking
- Initial: All [ ] unchecked.
- Update after each step: Mark [x], note issues/resolutions.
- Completion: When all [x], run full tests, use attempt_completion.

Estimated Time: 4-6 hours (coding + testing).
