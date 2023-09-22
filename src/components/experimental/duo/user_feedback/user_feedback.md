The main entry point component for gathering the user feedback for the AI features.

The component consists of a textual button and a connected modal with the actual form, emitting
the form data on submission.

## Custom button text

The component allows to customize the button text, presented to the user.

```html
<gl-user-feedback feedback-link-text="Leave your custom feedback" />
```

## Linking to a separate feedback form

The main goal of this component is to provide the advanced feedback form. However, it might not
be necessary for all consumers. In such a case, the component allows to bypass the default
form and link to an external feedback page/form.

```html
<gl-user-feedback feedback-link-url="https://gitlab.com" />
```

## Listening to the feedback form submission

This component emits the `feedback` event with all the options selected in the feedback form.

```html
<gl-user-feedback @feedback="myEventTracker" />
```

The returned event contains two props (`feedbackChoices` and `extendedTextFeedback`) coming from
the underlying `FeedbackModal` component. Here's the example of a possible event:

```json
{
  "feedbackChoices": ["unhelpful", "long"],
  "extendedTextFeedback": "The answer was too long to understand"
}
```
