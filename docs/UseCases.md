# Basic use cases description #
(*[http://dillinger.io/](http://dillinger.io/) to convert to pdf*)

## Registration ##
>Are credit card infos mandatory? not in V1 because they cannot be stored legally (yes for both in v2)
#### Client ####
1. Goes to the **Registration page**
2. **Enters contact information** 
(*email, password, telephone, first name, last name, birth date*)
3. **Clicks Register button**
4. Gets confirmation email with activation link (account is blocked) 
5. Gets **redirected to Home page**
6. Activates account via activation link  
(what to do if did not get email?
After 72h account is deleted if not activated
For support - Be able to generate activation link (low priority))
7. When connected to not activated account suggest resend activation link

#### Driver ####
1. Goes to the **Registration page**
2. **Enters contact information** (*email, password, telephone, first name, last name, birth date*)
3. **Clicks Register button** 
4. *Account is created*
5. Gets **redirected to Enterprise page** (*account is not active and cannot take rides*)
6. **Enters enterprise information** (**)
7. Gets **redirected to Vehicles page**
8. **Enters vehicle(s) information** (**) (at least one vehicle is mandatory and cannot be deleted)
9. Gets confirmation email with activation link (account is blocked)
10. Gets **redirected to Home page**
11. Activates account via activation link  
(what to do if did not get email?
After 72h account is deleted if not activated
For support - Be able to generate activation link (low priority))
12. When connected to not activated account suggest resend activation link

---

## Reservation ##
#### Client #### 
(*Required to be logged in with activated account*)
1. Goes to the **reservation page**
2. Can **change contact** data filled **from his account** by default
3. Fills **starting point** (*actual position by default*)
4. Fills **destination point** (*once both are filled map shows the route*)
5. Fills reservation **date and time** (*current datetime by default*)
6. Select **vehicle category** (*once start + destination + category selected => price and estimated time is displayed*)
(add note that price is based on estimated time and can be modified in extreme cases)
(option : show all categories prices)
7. **Clicks Reservation** button
8. Redirected to the **confirmation page** (*which says that he will be notified when his reservation is confirmed*)
9. Redirected to My reservations page (*Statuses : En attente, Confirmée, Realisée/Annulée; Has link to driver infos page once confirmed*)
10. Client should be able to cancel reservation (until 1h before the ride, otherwise ride is considered completed entirely)

#### Driver ####
(*Required to be logged in with activated account*)
1. **Notified** (*by email*) about new reservation available
2. **Navigates to Reservations en attente page**
3. **Accepts reservation** *making it non-available for other drivers*
4. **Client gets confirmation** (*by email*) and can see driver's details on My reservations page
5. **Driver can cancel reservation** (Client and admin are notified) and in this case reservation is available for other drivers (they are notified)

>*Service sends a reminder to both client and driver 1 day before and 1 hour before the reservation*

#### Admin ####
(*Required to be logged in with activated account*)
1. **Notified** (*by email*) about new reservation available
2. Can **see reservation status** (assigned to driver or not)
>3. Can forcibly **change assigned driver**
>	* If no driver was assigned client and driver get confirmation (*by email*)
>	* If driver was assigned old and new drivers get confirmation (*by email*)
>4. **Notified if reservation not accepted** after 1 hour, then 3 hours
3. Admin can see reservations "En attente" ordered by waiting for confirmation time (desc) 

---

## Ride ##
#### Driver ####
1. **Comes to destination point at time fixed**
2. **Clicks Start** button

If meets client
3. Brings client to destination
4. **Clicks Finish** button (*once got to destination*)
5. **Client pays** the ride to driver 
6. **Client can download invoice via My Reservations page**
>do we need to be able to adjust price? for now the price is exactly as on reservation page
(option: re-calculate price on Finish click and display new price)

If does not meet client
3. **Clicks Client is missing** button
4. **Client** is notified (*by email*) and **cancellation charges are applied**
(*if reservation made less then 2 hours ago then fixed charge is applied, otherwise, ride is considered to be completed*)
(2h should be configurable)

---

## Contact ##
#### Client ####
(*Required to be logged in*)
1. Goes to the **Contact page**
2. Fills in the request
3. Clicks Sent button

#### Admin ####
(*Required to be logged in*)
1. **Notified** (*by email*)

---
