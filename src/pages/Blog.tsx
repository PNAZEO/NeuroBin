import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-recycling.jpg';
import compostingImage from '@/assets/composting.jpg';
import ewasteImage from '@/assets/ewaste.jpg';

const Blog = () => {
  const blogPosts = [
    {
      id: "circular-economy-future",
      title: "The Future of Circular Economy in Waste Management",
      excerpt: "Exploring how circular economy principles are revolutionizing waste management practices and creating sustainable business models that benefit both the environment and economy.",
      image: heroImage,
      date: "2024-12-15",
      readTime: "8 min read",
      category: "Circular Economy"
    },
    {
      id: "composting-urban-areas",
      title: "Urban Composting: Transforming City Waste into Garden Gold",
      excerpt: "Discover innovative urban composting solutions that are helping cities reduce organic waste while creating valuable resources for urban farming and green spaces.",
      image: compostingImage,
      date: "2024-12-10",
      readTime: "6 min read",
      category: "Composting"
    },
    {
      id: "ewaste-crisis-solutions",
      title: "Tackling the Global E-Waste Crisis: Innovative Recycling Solutions",
      excerpt: "Learn about cutting-edge technologies and policies that are addressing the growing electronic waste problem while recovering valuable materials from discarded devices.",
      image: ewasteImage,
      date: "2024-12-05",
      readTime: "10 min read",
      category: "E-Waste"
    },
    {
      id: "community-waste-programs",
      title: "Building Successful Community Waste Reduction Programs",
      excerpt: "A comprehensive guide to implementing effective community-based waste reduction initiatives that engage residents and create lasting environmental impact.",
      image: heroImage,
      date: "2024-11-28",
      readTime: "7 min read",
      category: "Community Programs"
    },
    {
      id: "plastic-alternatives",
      title: "Beyond Plastic: Exploring Sustainable Packaging Alternatives",
      excerpt: "An in-depth look at innovative biodegradable and reusable packaging solutions that are helping businesses reduce their plastic footprint.",
      image: compostingImage,
      date: "2024-11-20",
      readTime: "9 min read",
      category: "Sustainability"
    },
    {
      id: "waste-to-energy",
      title: "Waste-to-Energy Technologies: Converting Trash into Power",
      excerpt: "Understanding modern waste-to-energy technologies and their role in sustainable waste management while addressing environmental concerns.",
      image: ewasteImage,
      date: "2024-11-15",
      readTime: "11 min read",
      category: "Technology"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Neurobin Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed about the latest trends, innovations, and best practices in sustainable 
            waste management. Our experts share insights on environmental technologies, policy updates, 
            and practical solutions for communities and businesses.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <Card className="overflow-hidden card-gradient border-border/50 hover-lift">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {blogPosts[0].category}
                  </span>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(blogPosts[0].date)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <Button asChild className="eco-gradient hover-lift self-start">
                  <Link to={`/blog/${blogPosts[0].id}`}>
                    Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden card-gradient border-border/50 hover-lift group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.date)}
                  </div>
                </div>
                <CardTitle className="text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                  <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    <Link to={`/blog/${post.id}`}>
                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;