## Dismiss

Users are able to permanently dismiss banners by default.
Banners may also be dismissed temporarily, depending on the use case.

### Permanent dismissal

The dismiss action is always represented by the `Close` icon and anchored
to the top right of the banner.

Banner dismissal should work as follows:

* Banner dismissal must be associated with the user in the system database.
  Dismissal must persist, even across version upgrades and clients.
* Banners do not reappear by default. In rare circumstances, you may present the
  banner again to a user after some time has passed.
* Banners should only be shown to users who are logged in.

**Implementation Notes:**

* The dismissal of the banner is achieved using the `UserCallout` model on the backend and the
  `PersistentUserCallout` JS file on the frontend. If both parameters are implemented correctly, the
  banner will adhere to the dismissal guidelines above.

### Temporary dismissal

To introduce temporary dismissal, include a secondary or tertiary button placed alongside
the primary action button. Follow the [button](https://design.gitlab.com/components/button#alignment)
alignment and order guidelines.

Temporary dismissals should work as follows:

* Banners dismissed temporarily will reappear after **7 days**.
* After a banner is dismissed temporarily, use a [toast](?path=/story/base-toast--default) message
  to let the user know they will see the banner again in 7 days.
