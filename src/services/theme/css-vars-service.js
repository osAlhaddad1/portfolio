export function applySceneCssVariables(config) {
  const rs = document.documentElement.style;
  rs.setProperty('--background-noise-opacity', config.background.noiseOpacity);
  rs.setProperty('--c_text', config.colors.text);
  rs.setProperty('--c_theme_nav_hover', config.colors.navHover);
  rs.setProperty('--c_blue_start', config.colors.themes.blue.start);
  rs.setProperty('--c_blue_mid', config.colors.themes.blue.mid);
  rs.setProperty('--c_blue_end', config.colors.themes.blue.end);
  rs.setProperty('--c_blue_picker', config.colors.themes.blue.picker);
  rs.setProperty('--c_purple_start', config.colors.themes.purple.start);
  rs.setProperty('--c_purple_mid', config.colors.themes.purple.mid);
  rs.setProperty('--c_purple_end', config.colors.themes.purple.end);
  rs.setProperty('--c_purple_picker', config.colors.themes.purple.picker);
  rs.setProperty('--c_hotpink_start', config.colors.themes.hotpink.start);
  rs.setProperty('--c_hotpink_mid', config.colors.themes.hotpink.mid);
  rs.setProperty('--c_hotpink_end', config.colors.themes.hotpink.end);
  rs.setProperty('--c_hotpink_picker', config.colors.themes.hotpink.picker);
  rs.setProperty('--c_black_start', config.colors.themes.black.start);
  rs.setProperty('--c_black_mid', config.colors.themes.black.mid);
  rs.setProperty('--c_black_end', config.colors.themes.black.end);
  rs.setProperty('--c_black_picker', config.colors.themes.black.picker);
}

