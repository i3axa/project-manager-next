export default function useTouchDeviceDetection() {
  const isTouchDevice = () => {
    const match = window.matchMedia('(pointer:coarse)');
    return match && match.matches;
  };

  return { isTouchDevice };
}
