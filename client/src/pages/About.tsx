import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Github, ExternalLink } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">Map3D</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Özellikler
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Hakkında
            </Link>
            <Button className="button-primary">Başla</Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 py-20">
        <div className="container max-w-3xl">
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4">Hakkında</h1>
            <p className="text-xl text-muted-foreground">
              Map3D, OpenStreetMap verilerini kullanarak gerçek dünya 3D haritaları oluşturmayı basit ve erişilebilir hale getiren açık kaynaklı bir projedir.
            </p>
          </div>

          <div className="space-y-12">
            {/* Project Overview */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Proje Hakkında</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Map3D, React-Three-Fiber ve Three.js teknolojileri kullanarak geliştirilmiştir. Bu proje, OpenStreetMap'in açık verilerini işleyerek, kullanıcıların seçtikleri herhangi bir şehir bölgesinin 3D modelini oluşturmasını sağlar.
              </p>
              <p className="text-lg text-muted-foreground">
                Oluşturulan 3D haritalar GLB formatında dışa aktarılabilir ve Blender, Unity, Unreal Engine gibi popüler 3D yazılımlarında kullanılabilir.
              </p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Ana Özellikler</h2>
              <ul className="space-y-3 text-lg text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>OpenStreetMap verilerinden otomatik 3D bina oluşturma</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Şehir yollarının 3D görselleştirilmesi</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>GLB formatında dışa aktarma</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>İnteraktif harita seçimi arayüzü</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span>Tamamen ücretsiz ve açık kaynaklı</span>
                </li>
              </ul>
            </section>

            {/* Technology Stack */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Teknoloji Yığını</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Frontend</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>React 19</li>
                    <li>Three.js</li>
                    <li>React-Three-Fiber</li>
                    <li>Leaflet</li>
                  </ul>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Veri Kaynakları</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>OpenStreetMap</li>
                    <li>Overpass API</li>
                    <li>Elevation Data</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Roadmap */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Yol Haritası</h2>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span className="text-muted-foreground">3D Binalar Oluşturma</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span className="text-muted-foreground">Yol Haritaları</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-accent font-bold">✓</span>
                  <span className="text-muted-foreground">GLB Dışa Aktarma</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground/50 font-bold">◯</span>
                  <span className="text-muted-foreground">Bina Dokuları</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground/50 font-bold">◯</span>
                  <span className="text-muted-foreground">Yükseklik Özelleştirmesi</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground/50 font-bold">◯</span>
                  <span className="text-muted-foreground">Materyal Desteği</span>
                </div>
              </div>
            </section>

            {/* Important Note */}
            <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-bold text-yellow-900 mb-2">⚠️ Önemli Not</h3>
              <p className="text-yellow-800">
                Bu proje, OpenStreetMap verilerini kullanır. Bazı bölgelerde yükseklik verileri eksik veya hatalı olabilir. Gelecekte, kullanıcıların bu verileri manuel olarak düzeltebilmesi için bir özellik eklenecektir.
              </p>
            </section>

            {/* Links */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-4">Bağlantılar</h2>
              <div className="flex flex-col gap-3">
                <a href="https://github.com/cartesiancs/map3d" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
                  <Github className="w-5 h-5" />
                  <span>GitHub Deposu</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a href="https://map.fleet.im" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
                  <ExternalLink className="w-5 h-5" />
                  <span>Canlı Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white py-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Map3D. MIT Lisansı altında yayınlanmıştır.</p>
        </div>
      </footer>
    </div>
  );
}
