import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { MapPin, Zap, Download, Layers, Map, Gauge } from "lucide-react";

export default function Features() {
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
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-4">Özellikler</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Map3D, 3D harita oluşturmayı güçlü ve esnek araçlarla destekler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Feature: 3D Buildings */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <CardTitle className="text-2xl">3D Binalar</CardTitle>
                    <CardDescription>Otomatik Bina Oluşturma</CardDescription>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <Layers className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  OpenStreetMap verilerinden otomatik olarak 3D binalar oluşturun. Gerçek dünya geometrisi ve yükseklik verileriyle doğru modeller.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Otomatik yükseklik hesaplaması</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Gerçek bina geometrisi</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Büyük alanları destekler</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature: Road Visualization */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <CardTitle className="text-2xl">Yol Haritaları</CardTitle>
                    <CardDescription>Şehir Yollarının 3D Görselleştirilmesi</CardDescription>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <Map className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Şehir yollarını 3D olarak görselleştirin. Trafik akışı ve şehir planlama analizi için ideal.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Tüm yol türlerini destekler</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Yol genişliği verileri</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Kesişim noktaları</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature: GLB Export */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <CardTitle className="text-2xl">GLB Dışa Aktarma</CardTitle>
                    <CardDescription>Standart 3D Format Desteği</CardDescription>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <Download className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Oluşturulan 3D haritaları GLB formatında indirin ve popüler 3D yazılımlarında kullanın.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Blender uyumlu</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Unity/Unreal Engine desteği</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Web 3D uygulamaları</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature: Interactive Map */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <CardTitle className="text-2xl">İnteraktif Harita</CardTitle>
                    <CardDescription>Kolay Alan Seçimi</CardDescription>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <Gauge className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Basit ve sezgisel arayüzle 3D modellenmesini istediğiniz alanı seçin.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Zoom ve pan desteği</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Dikdörtgen seçim aracı</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Gerçek zamanlı önizleme</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature: Performance */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <CardTitle className="text-2xl">Yüksek Performans</CardTitle>
                    <CardDescription>Optimize Edilmiş İşleme</CardDescription>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Three.js ve WebGL kullanarak hızlı ve akıcı 3D görselleştirme.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>GPU hızlandırması</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Büyük modeller desteği</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Mobil cihazlar uyumlu</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature: Open Source */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <CardTitle className="text-2xl">Açık Kaynaklı</CardTitle>
                    <CardDescription>MIT Lisansı</CardDescription>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Tamamen açık kaynaklı ve ücretsiz. Kendi ihtiyaçlarınıza göre özelleştirebilirsiniz.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>MIT Lisansı</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>GitHub'da erişilebilir</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>Katkılar hoş geldiniz</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Table */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Karşılaştırma</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold text-foreground">Özellik</th>
                    <th className="text-center py-4 px-4 font-semibold text-foreground">Map3D</th>
                    <th className="text-center py-4 px-4 font-semibold text-muted-foreground">Diğer Araçlar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-4 px-4 text-foreground">3D Bina Oluşturma</td>
                    <td className="text-center py-4 px-4 text-accent font-semibold">✓</td>
                    <td className="text-center py-4 px-4 text-muted-foreground">✓</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-4 text-foreground">GLB Dışa Aktarma</td>
                    <td className="text-center py-4 px-4 text-accent font-semibold">✓</td>
                    <td className="text-center py-4 px-4 text-muted-foreground">✓</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-4 text-foreground">Açık Kaynaklı</td>
                    <td className="text-center py-4 px-4 text-accent font-semibold">✓</td>
                    <td className="text-center py-4 px-4 text-muted-foreground">✗</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 px-4 text-foreground">Tamamen Ücretsiz</td>
                    <td className="text-center py-4 px-4 text-accent font-semibold">✓</td>
                    <td className="text-center py-4 px-4 text-muted-foreground">✗</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-foreground">Web Tabanlı</td>
                    <td className="text-center py-4 px-4 text-accent font-semibold">✓</td>
                    <td className="text-center py-4 px-4 text-muted-foreground">✗</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Tüm Özellikleri Keşfedin</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Map3D ile 3D harita oluşturmaya başlayın. Ücretsiz, açık kaynaklı ve sınırsız kullanım.
            </p>
            <Button size="lg" className="button-primary">
              Uygulamayı Aç
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white py-12 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Map3D. MIT Lisansı altında yayınlanmıştır.</p>
        </div>
      </footer>
    </div>
  );
}
