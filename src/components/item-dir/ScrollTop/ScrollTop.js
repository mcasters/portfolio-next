function ScrollTop() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <button type="button" onClick={scrollTop} className="buttonLink">
      Haut de page
    </button>
  );
}

export default ScrollTop;
