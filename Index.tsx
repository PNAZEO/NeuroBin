import { ArrowRight, Leaf, Recycle, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-recycling.jpg';
import compostingImage from '@/assets/composting.jpg';
import ewasteImage from '@/assets/ewaste.jpg';

const Index = () => {
  const features = [
    {
      icon: <Recycle className="h-8 w-8 text-primary" />,
      title: "Advanced Recycling",
      description: "State-of-the-art recycling processes that maximize material recovery and minimize environmental impact.",
      image: heroImage
    },
    {
      icon: <Leaf className="h-8 w-8 text-eco-green" />,
      title: "Organic Composting", 
      description: "Transform organic waste into nutrient-rich compost for sustainable agriculture and gardening.",
      image: compostingImage
    },
    {
      icon: <TreePine className="h-8 w-8 text-eco-blue" />,
      title: "E-Waste Solutions",
      description: "Responsible disposal and recycling of electronic devices to prevent toxic contamination.",
      image: ewasteImage
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Modern recycling facility with sustainable waste management"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Neurobin
              <span className="block text-primary">Waste Management Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Leading the way in sustainable waste management with innovative recycling, composting, and eco-friendly disposal solutions for a cleaner tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="eco-gradient hover-lift glow-effect">
                <Link to="/about">
                  Learn More <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover-lift border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/resources">
                  Explore Resources
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sustainable Solutions for Every Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive waste management approach focuses on reducing environmental impact while maximizing resource recovery and sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift card-gradient border-border/50 overflow-hidden group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Building a Sustainable Future
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              At Neurobin, we believe that effective waste management is the cornerstone of environmental sustainability. 
              Our mission is to transform how communities think about waste by providing innovative solutions that turn 
              waste streams into valuable resources, creating a circular economy that benefits both people and the planet.
            </p>
            <Button asChild size="lg" className="eco-gradient hover-lift">
              <Link to="/blog">
                Read Our Blog <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
