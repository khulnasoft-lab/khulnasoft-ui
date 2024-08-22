Collapse is used to keep pages focused on the overview of what the user can do. Details and
additional actions are hidden in the fold, and can be opened if the user wants to interact with
those elements.

## Troubleshooting

When collapsing the container, padding on the collapse component causes
complications with the height calculations.
The result is a bit of jumpiness at the end of the collapse animation.

The quick solution is to bring the padding into an inner container, which
simplifies the height calculations and removes the jumpiness.

```html
<!-- bad -->
<gl-collapse class="gl-p-3">
    <!-- content -->
</gl-collapse>

<!-- good -->
 <gl-collapse>
    <div class="gl-p-3">
        <!-- content -->
    </div>
</gl-collapse>
```
