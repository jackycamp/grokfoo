# grokfoo

### A basic browser extension that lets you select text on a webpage and send to Grok with commands.

Install the [extension](https://addons.mozilla.org/en-US/firefox/addon/grok-foo/)

When you send to Grok, a new browser tab opens at https://x.com/i/grok, the extension waits for the page to load, injects the prompt
and submits for you.

## Disclaimers

I, the developer of this extension, am not affiliated with x.com or grok in anyway.

This project's code is fully open-source. Your prompts, the content you're viewing, and other relevant data are not collected.

With the help of grok and claude-sonnet, this project was created in about 30 minutes. There are some parts in the code
that could probably be cleaned up, but hey, it works for the most part.

If any changes are made to the x-grok-ui, this extension might break. If it does, feel free to submit an issue or open a pull request.

## Logo Attribution

The logo used for this project was generated by grok.

## Support

If you feel like supporting this project, please check out my kofi page. Donations/tips are not at all expected
but are certainly appreciated.

[kofi](https://ko-fi.com/jackcamp)

## Publishing

Publishing a new version of the extension is a manual process (for now).
Just zip the contents of the grokfoo directory and upload it to firefox-addon developer hub.

```bash
# at the root of this repo run:
zip -r grokfoo.zip . -x ".git/*" "README.md" "*.zip" ".gitignore"
```

Then you can upload `grokfoo.zip`.
