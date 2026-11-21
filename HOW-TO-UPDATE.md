# How to publish and update your website

Everything is done in your web browser on github.com. You do not need to install anything.

## Part 1: Put the website online (one time, about 15 minutes)

1. Create a free account at https://github.com. Choose your username carefully: it becomes part of your web address. Example: username `abdulkaium` gives `https://abdulkaium.github.io`.
2. Click **+** (top right) > **New repository**.
3. For **Repository name**, type exactly `yourusername.github.io` (with your real username). Set it to **Public**. Click **Create repository**.
4. On the next page, click **uploading an existing file**.
5. Unzip `kaium-website.zip` on your computer. Open the unzipped folder, select **everything inside it** (all files and folders, not the folder itself) and drag it into the browser window.
6. Wait for the upload to finish, then click **Commit changes**.
7. Go to **Settings** > **Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main** and folder to **/ (root)**. Click **Save**.
8. After 1–3 minutes, your site is live at `https://yourusername.github.io`. The **Actions** tab shows progress; a green tick means it is published.

Tip: if you used a different repository name, open `_config.yml` and set `baseurl: "/repository-name"`.

## Part 2: Fill in your details (do this first)

To edit any file on GitHub: open it, click the **pencil icon**, make changes, then click **Commit changes**. The site updates in 1–2 minutes.

| What | File |
|---|---|
| Email, phone, Google Scholar, ResearchGate, LinkedIn links | `_config.yml` |
| Bachelor's degree and other biodata details | `biodata.html` (search for "add title") |
| Your photo | Upload `profile.jpg` into `assets/img/`, then in `_config.yml` change `photo:` to `/assets/img/profile.jpg` |
| Downloadable CV | Upload a PDF named exactly `CV-Abdul-Kaium.pdf` into `assets/`. A download button appears automatically. |
| PhD and postdoc project titles | `_data/projects.yml` (the two "add title" entries) |

Please also check the names and thesis topics in `_data/members.yml` with your students before publishing, and decide whether you want proposed (not yet funded) projects shown on the Projects page.

## Part 3: Everyday updates

### Share class materials
1. Open the folder `materials`, then the course folder, e.g. `materials/agch-107`.
2. Click **Add file** > **Upload files**, drop in PDFs or slides, click **Commit changes**.
3. They appear on the Teaching page automatically. The file name becomes the title, so name files clearly, e.g. `03-Radioactive-decay-and-half-life.pdf`.

To add a new course, copy a block in `_data/courses.yml` and create the matching folder (when uploading, type `materials/new-folder-name/` in the file path).

GitHub accepts files up to 25 MB through the browser. Compress large PDFs first, or share very large files through Google Drive and put the link in a blog post.

### Write a blog post, popular article or informative article
1. Open the folder `_posts`, click **Add file** > **Create new file**.
2. Name it `YEAR-MONTH-DAY-short-title.md`, for example `2026-12-05-arsenic-in-rice.md`.
3. Start the file with this header, then write below it:

```
---
title: Is there arsenic in our rice?
category: Popular science
summary: One or two sentences shown in the list of posts.
---

Your article starts here. Leave a blank line between paragraphs.

## A subheading

- A bullet point
- **Bold text** and *italic text*
- A link: [Department website](https://sau.edu.bd)
```

4. Click **Commit changes**. The post appears on the Blog page and the home page.

Use one of these categories (or create your own; filter buttons appear automatically): `Blog`, `Popular science`, `Informative`.

To add a picture to a post, upload it to `assets/gallery/` and write `![Description of picture]({{ '/assets/gallery/picture-name.jpg' | relative_url }})`.

### Add a group member
Open `_data/members.yml`, copy one person's block, and edit it. Groups: `pi`, `phd`, `ms`, `ra` (research staff), `alumni`. For a photo, upload a square image to `assets/img/people/` and write its file name after `photo:`. When a student graduates, change their `group` to `alumni` and add a `now:` line.

### Add a project
Open `_data/projects.yml` and copy a block. Set `status` to `ongoing`, `proposed` or `completed`. When a proposal is funded, change `proposed` to `ongoing`.

### Add a collaboration
Open `_data/collaborations.yml` and copy a block.

### Add photos and videos
- **Photos:** upload JPG files (ideally under 1 MB each) to `assets/gallery/`, then in `_data/gallery.yml` add a block under `photos:` with the file name, caption, date and album.
- **Videos:** upload to YouTube (you can choose "Unlisted"), copy the video ID and add a block under `videos:`.

### Add selected publications
The Publications page fills itself from your ORCID profile, so keep ORCID up to date. To highlight key papers at the top, add them to `_data/publications.yml`.

## Formatting rules for the .yml files

These files are sensitive to spacing:
- Keep the same indentation (two spaces) as the existing entries. Never use the Tab key.
- If a line contains a colon `:` in the text, wrap the text in quotes: `title: "Arsenic: a hidden risk"`.
- If the site stops updating after a change, open the **Actions** tab. A red cross means an error, usually a spacing mistake in the last file you edited. Undo or fix that change.

## Optional extras

- **Your own domain** (e.g. kaiumlab.org, about US$10–15/year): buy it from any registrar, then add it under Settings > Pages > Custom domain.
- **University subdomain:** ask SAU's IT office to point a name such as `kaium.sau.edu.bd` to your GitHub Pages site.
- **Google search:** register your site free at Google Search Console so it appears in search results sooner.
