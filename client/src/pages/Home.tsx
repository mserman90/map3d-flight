import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Download, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">Map3D</span>
          </div>
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

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  3D Şehir Haritaları Oluşturun
                </h1>
                <p className="text-xl text-muted-foreground">
                  OpenStreetMap verilerini kullanarak gerçek dünya 3D haritaları oluşturun ve GLB formatında dışa aktarın.
                </p>
              </div>
              <div className="flex gap-4">
                <Link href="/radar">
                  <Button size="lg" className="button-primary">
                    Radar Görüntüle
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Daha Fazla Bilgi
                </Button>
              </div>
              <div className="pt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                Tamamen ücretsiz ve açık kaynaklı
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663044373862/ZLZUhoqzWUE7wwzV7wsJED/hero-banner-XkgUKouWnwX2hBRkiABdZg.webp"
                alt="3D City Map Visualization"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Güçlü Özellikler</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Map3D, 3D harita oluşturmayı basit ve erişilebilir hale getirir
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: 3D Buildings */}
            <Card className="border-border hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-xl">3D Binalar</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  OpenStreetMap verilerinden otomatik olarak 3D binalar oluşturun. Gerçek dünya geometrisi ve yükseklik verileriyle doğru modeller.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2: GLB Export */}
            <Card className="border-border hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-xl">GLB Dışa Aktarma</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Oluşturulan 3D haritaları GLB formatında indirin. Blender, Unity, Unreal Engine ve diğer 3D uygulamalarıyla uyumlu.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3: Road Data */}
            <Card className="border-border hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-xl">Yol Haritaları</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Şehir yollarını 3D olarak görselleştirin. Trafik akışı ve şehir planlama analizi için ideal.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Nasıl Çalışır?</h2>
            <p className="text-lg text-muted-foreground">Üç basit adımda 3D harita oluşturun</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Harita Seçin",
                description: "İnteraktif harita üzerinde 3D modellenmesini istediğiniz alanı seçin",
              },
              {
                step: "2",
                title: "İşleyin",
                description: "OpenStreetMap verilerini işleyerek 3D binalar ve yollar oluşturun",
              },
              {
                step: "3",
                title: "Dışa Aktarın",
                description: "Tamamlanan 3D haritayı GLB formatında indirin ve kullanın",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-lg p-8 text-center border border-border">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Başlamaya Hazır mısınız?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Şimdi 3D harita oluşturmaya başlayın. Ücretsiz, açık kaynaklı ve sınırsız kullanım.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            Uygulamayı Aç
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">Map3D</h3>
              <p className="text-sm text-muted-foreground">
                OpenStreetMap verilerini kullanarak 3D haritalar oluşturun.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Bağlantılar</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features">Özellikler</Link></li>
                <li><Link href="/about">Hakkında</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Yasal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Lisans</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Gizlilik</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Kaynaklar</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Belgeler</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Destek</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2026 Map3D. MIT Lisansı altında yayınlanmıştır.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="hover:text-foreground transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
