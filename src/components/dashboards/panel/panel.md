Panels provide a consistent UI, within a dashboarding environment. The panels should be used to
render a visualization of various kinds including different types of charts, markdown, or tables.

## Panel data

Panels are not sent the visualization's data. The handling of data should be done on a
per-visualization basis. This is because one visualization could be used in many locations, so how
it retrieves and handles data should be self-contained, whilst panels are one instance of the
visualization with descriptive UI elements.

## Delayed loading of content

In the event that a visualization is taking a while to load, be that due to server delays, or the
amount of data being retrieved, you can signal this to the panel. The panel will then show some
additional informational text to the user so they're aware it's not an issue on their end.

Identifying whether the request is taking a while to load, but is still being processed should be
handled by the parent component based upon signals sent from the visualization itself.
