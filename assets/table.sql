CREATE TABLE IF NOT EXISTS quran (
  id                  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  surah_no            INT,
  surah_name_en       TEXT,
  surah_name_ar       TEXT,
  surah_name_roman    TEXT,
  ayah_no_surah       INT,
  ayah_no_quran       INT,
  ayah_ar             TEXT,
  ayah_en             TEXT,
  total_ayah_surah    INT,
  total_ayah_quran    INT,
  place_of_revelation TEXT
);