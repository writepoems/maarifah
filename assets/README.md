# Quran PG Setup

This directory contains the dataset, setup script, and other additional files used to import the entire Quran into a single PostgreSQL table.

## Usage

1. Configure `config.example.json` (and rename to `config.json`)
2. Run `setup.ts` after installing `pg` and `udsv`
3. Test whether or not everything was imported by running the script again, or check your database manually

Alternatively, you can do `bun db:setup` to do this automatically.