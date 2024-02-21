The main entry point component for gathering the user feedback for AI features.

The component consists of a textual button and a connected modal with the actual form, emitting
the form data on submission.

## Custom button text

The component allows to customize the button text presented to the user.

```html
<gl-duo-user-feedback feedback-link-text="Leave your custom feedback" />
```

## Linking to a separate feedback form

The main goal of this component is to provide an advanced feedback form. However, it might only
be necessary for some consumers. In such a case, the component bypasses the default
form and links to an external feedback page/form.

```html
<gl-duo-user-feedback feedback-link-url="https://gitlab.com" />
```

## Listening to the feedback form submission

This component emits the `feedback` event with all the options selected in the feedback form.

```html
<gl-duo-user-feedback @feedback="myEventTracker" />
```

The returned event contains two props (`feedbackChoices` and `extendedTextFeedback`) from
the underlying `FeedbackModal` component. Here's an example of a possible event:

```json
{
  "feedbackChoices": ["unhelpful", "long"],
  "extendedTextFeedback": "The answer was too long to understand"
}
```

## Using the `feedback-extra-fields` slot

By default, the component renders one extra textarea field to gather additional feedback
information from users. However, it may not be enough sometimes, and different use cases of
this component might need to fine-tune the form to gather information most suitable for that
or another use case. For this purpose, the component provides the `feedback-extra-fields`
slot, which can override the default textarea with different fields/information.

Note, however, that the content put into this slot will override the default textarea. So,
if you want to append additional fields, instead of completely overriding the default textarea,
you must copy the textarea field from the `DuoChatFeedbackModal` component into the slot.

```html
<gl-duo-user-feedback
  :feedback-link-text="feedbackLinkText"
  :feedback-link-url="feedbackLinkUrl"
  @feedback="logEvent"
>
  <template #feedback-extra-fields>
    <gl-form-group label="What were you doing?" optional>
      <gl-form-textarea
        placeholder="The situation in which you interacted with GitLab Duo Chat."
        v-model="didWhat"
      />
    </gl-form-group>
    <gl-form-group label="What were you expecting from the response?" optional>
      <gl-form-textarea
        placeholder="What kind of information or assistance were you hoping to receive?"
        v-model="expectedWhat"
      />
    </gl-form-group>
    <gl-form-group label="How could the response be improved?" optional>
      <gl-form-textarea
        placeholder="How the response might better meet your needs."
        v-model="improveWhat"
      />
    </gl-form-group>
  </template>
</gl-duo-user-feedback>
```
