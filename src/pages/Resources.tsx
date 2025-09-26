import { ExternalLink, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Resources = () => {
  const externalResources = [
    {
      title: "EPA Recycling Guidelines",
      description: "Comprehensive recycling guidelines and best practices from the Environmental Protection Agency.",
      url: "https://www.epa.gov/recycle",
      category: "Government Resources"
    },
    {
      title: "Zero Waste Home",
      description: "Learn about zero waste living and practical tips for reducing household waste.",
      url: "https://www.zerowastehome.com",
      category: "Lifestyle"
    },
    {
      title: "Earth911 Recycling Guide",
      description: "Find local recycling centers and learn what materials can be recycled in your area.",
      url: "https://www.earth911.com",
      category: "Local Resources"
    },
    {
      title: "Ellen MacArthur Foundation",
      description: "Leading resource for circular economy principles and case studies.",
      url: "https://www.ellenmacarthurfoundation.org",
      category: "Circular Economy"
    },
    {
      title: "Waste Management Research Journal",
      description: "Latest research and developments in waste management technology and policy.",
      url: "https://www.journals.elsevier.com/waste-management",
      category: "Research"
    },
    {
      title: "GreenBiz Waste Management",
      description: "Business insights and trends in sustainable waste management practices.",
      url: "https://www.greenbiz.com/topics/waste",
      category: "Business"
    },
    {
      title: "UN Environment Programme",
      description: "Global perspective on waste management and environmental sustainability.",
      url: "https://www.unep.org/explore-topics/resource-efficiency/what-we-do/sustainable-lifestyles",
      category: "International"
    },
    {
      title: "Recycling Today Magazine",
      description: "Industry news, trends, and innovations in recycling and waste management.",
      url: "https://www.recyclingtoday.com",
      category: "Industry News"
    }
  ];

  const faqs = [
    {
      question: "What types of materials can be recycled?",
      answer: "Most common recyclable materials include paper, cardboard, glass bottles and jars, aluminum cans, steel cans, and certain plastics (marked with recycling codes 1-7). However, accepted materials vary by location, so check with your local recycling program for specific guidelines."
    },
    {
      question: "How should I prepare materials for recycling?",
      answer: "Clean containers of food residue, remove labels when possible, and separate materials by type. Avoid putting recyclables in plastic bags unless your program specifically accepts them. When in doubt, check with your local recycling center."
    },
    {
      question: "What is composting and how do I start?",
      answer: "Composting is the natural process of decomposing organic matter into nutrient-rich soil amendment. Start with a balance of 'greens' (nitrogen-rich materials like food scraps) and 'browns' (carbon-rich materials like dry leaves). Maintain proper moisture and turn regularly for best results."
    },
    {
      question: "How can businesses implement waste reduction strategies?",
      answer: "Businesses can conduct waste audits, implement source reduction practices, establish recycling programs, partner with waste management companies, educate employees, and set measurable waste reduction goals. Consider circular economy principles in product design and procurement."
    },
    {
      question: "What is the circular economy?",
      answer: "The circular economy is an economic model that aims to eliminate waste and maximize resource efficiency. Instead of the traditional 'take-make-dispose' approach, it focuses on reusing, refurbishing, remanufacturing, and recycling materials to create a closed-loop system."
    },
    {
      question: "How do I dispose of electronic waste safely?",
      answer: "Electronic waste (e-waste) contains hazardous materials and should never go in regular trash. Look for certified e-waste recycling centers, manufacturer take-back programs, or special collection events. Many retailers also offer recycling programs for electronics."
    },
    {
      question: "What are the environmental benefits of proper waste management?",
      answer: "Proper waste management reduces greenhouse gas emissions, conserves natural resources, prevents pollution of soil and water, protects wildlife habitats, and reduces the need for raw material extraction. It also creates jobs and supports sustainable economic development."
    },
    {
      question: "How can communities organize waste reduction initiatives?",
      answer: "Communities can organize clean-up events, establish tool libraries and repair cafes, create community gardens using compost, advocate for better local waste policies, and educate residents through workshops and information campaigns."
    }
  ];

  const categories = [...new Set(externalResources.map(resource => resource.category))];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Resources & Information
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our curated collection of external resources, research, and frequently asked questions 
            to deepen your understanding of sustainable waste management practices.
          </p>
        </div>

        {/* Visual Demo */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">Visual Demo</h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="card-gradient border-border/50 p-6">
              <video 
                controls 
                preload="metadata"
                className="w-full rounded-lg shadow-lg"
                style={{ maxHeight: '500px' }}
              >
                <source src="/videos/visual_demo_2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Card>
          </div>
        </section>

        {/* External Resources */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">External Resources</h2>
          
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h3 className="text-xl font-semibold text-foreground mb-6 border-b border-border pb-2">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {externalResources
                  .filter(resource => resource.category === category)
                  .map((resource, index) => (
                  <Card key={index} className="hover-lift card-gradient border-border/50 group">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-foreground group-hover:text-primary transition-colors">
                        {resource.title}
                        <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground mb-4">
                        {resource.description}
                      </CardDescription>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        Visit Resource
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* FAQ Section */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-6">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get answers to common questions about waste management, recycling, and sustainability practices.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border/50 rounded-lg px-6 card-gradient"
                >
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resources;