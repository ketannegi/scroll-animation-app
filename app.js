/*
 * A simple React component that demonstrates scroll‑triggered animations.
 * Each section begins off the screen (faded and translated down) and
 * becomes visible when it enters the viewport. We use the
 * IntersectionObserver API to detect visibility and attach a `visible`
 * class to animate the section. Because our React code runs in the
 * browser, we import React and ReactDOM from the UMD bundles that
 * we included in index.html.
 */

const { useEffect, useRef } = React;

function App() {
  // Create a ref that will hold references to all our section elements
  const sectionsRef = useRef([]);

  // Use an effect to set up the IntersectionObserver after the component mounts
  useEffect(() => {
    // Callback executed whenever a section intersects the viewport
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };
    // Create an IntersectionObserver with a sensible threshold
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.3,
    });
    // Observe each section element
    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });
    // Cleanup: unobserve when the component unmounts
    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Render multiple sections with placeholder content
  const sections = Array.from({ length: 5 }).map((_, index) => {
    return React.createElement(
      'div',
      {
        key: index,
        className: 'section',
        ref: (el) => (sectionsRef.current[index] = el),
      },
      React.createElement('h1', null, `Section ${index + 1}`),
      React.createElement(
        'p',
        null,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula, massa vel laoreet faucibus, turpis turpis rutrum metus, a interdum est lectus nec urna.'
      )
    );
  });
  return React.createElement(React.Fragment, null, sections);
}

// Render our App component into the root element
ReactDOM.render(React.createElement(App), document.getElementById('root'));