
export default function PlatformLogosPage() {
  return (
    <>
      <div className="flex flex-col gap-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 12 }, (_, index) => (
            <div className="platform-logo">
              <img
                src="/guide/images/brand/logo-signature.png"
                alt={`Platform Logo ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
