export const sendEvent = (action, category, label, value) => {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    } else {
      console.warn('Google Analytics no está configurado correctamente.');
    }
  };