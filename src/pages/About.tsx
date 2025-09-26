import { Target, Eye, Award, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Mission",
      description: "To revolutionize waste management through innovative technology and sustainable practices, creating a cleaner environment for future generations."
    },
    {
      icon: <Eye className="h-8 w-8 text-eco-green" />,
      title: "Vision", 
      description: "A world where waste becomes a valuable resource, where circular economy principles guide all communities, and environmental sustainability is the norm."
    },
    {
      icon: <Award className="h-8 w-8 text-eco-blue" />,
      title: "Values",
      description: "Sustainability, innovation, transparency, and community engagement drive everything we do. We believe in making environmental responsibility accessible to all."
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "Community",
      description: "We work closely with local communities, businesses, and governments to create customized waste management solutions that meet specific regional needs."
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Neurobin
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Founded on the principle that waste is simply misplaced resources, Neurobin has been at the forefront 
            of sustainable waste management innovation for over a decade. We transform challenges into opportunities, 
            creating value from what others discard.
          </p>
        </div>

        {/* Our Work Section */}
        <div className="mb-20">
          <Card className="card-gradient border-border/50 p-8 lg:p-12">
            <CardContent className="space-y-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Work</h2>
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  This is where we transition from a great waste management process to a leading-edge, intelligent system.
                </p>
                <p className="leading-relaxed">
                  Integrating Artificial Intelligence is the key to achieving unprecedented accuracy, efficiency, and real-time data insights across our six streams.
                </p>
                
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Our Intelligent Waste Management System: The Power of AI</h3>
                  <p className="leading-relaxed mb-6">
                    We don't just sort the waste; we analyze and optimize the entire process using Artificial Intelligence and Computer Vision. This transforms our central facility into a high-tech Material Intelligence Hub.
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">AI in Action: Precision Sorting and Quality Control</h3>
                  <p className="leading-relaxed mb-6">
                    The core of our AI system is in the automated segregation line for streams 1 (Biodegradable), 2 (Recyclable), and 3 (Non-Recyclable).
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <Card className="card-gradient border-border/50 p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-3">High-Speed Scanners</h4>
                      <p className="text-sm text-primary mb-2">Computer Vision (CNNs)</p>
                      <p className="text-sm leading-relaxed">
                        Cameras and sensors capture images of the waste passing on the conveyor belt. The AI instantly identifies the material with up to 99% accuracy.
                      </p>
                    </Card>
                    
                    <Card className="card-gradient border-border/50 p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-3">Contamination Detection</h4>
                      <p className="text-sm text-eco-blue mb-2">Predictive Analytics</p>
                      <p className="text-sm leading-relaxed">
                        The AI monitors quality and sends immediate alerts for contamination spikes, allowing real-time corrections.
                      </p>
                    </Card>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">AI Across All Six Streams: Data and Optimization</h3>
                  <p className="leading-relaxed mb-6">
                    The true value of our system lies in the data the AI continuously collects from all six streams:
                  </p>
                  
                  <div className="space-y-4">
                    <Card className="card-gradient border-border/50 p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-2">Waste Profiling & Trend Analysis</h4>
                      <p className="text-sm leading-relaxed">
                        AI analyzes volume and composition trends across all streams, providing insights like "15% more E-waste this quarter" or "Biomedical Waste peaks on Tuesdays."
                      </p>
                    </Card>
                    
                    <Card className="card-gradient border-border/50 p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-2">Route Optimization</h4>
                      <p className="text-sm leading-relaxed">
                        AI uses fill-level sensors and traffic data to calculate efficient truck routes, reducing collection costs and carbon emissions by up to 30%.
                      </p>
                    </Card>
                    
                    <Card className="card-gradient border-border/50 p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-2">Compliance & Reporting</h4>
                      <p className="text-sm leading-relaxed">
                        Automatic tracking of hazardous and E-waste materials, generating flawless, audit-ready compliance reports for legal disposal.
                      </p>
                    </Card>
                    
                    <Card className="card-gradient border-border/50 p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-2">Source Auditing</h4>
                      <p className="text-sm leading-relaxed">
                        By analyzing waste composition, AI identifies contamination sources, enabling targeted, data-driven educational campaigns.
                      </p>
                    </Card>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
                  <h3 className="text-xl font-bold text-foreground mb-3">Why AI is Essential</h3>
                  <p className="leading-relaxed">
                    By leveraging AI, we have moved beyond basic waste handling. We have created a dynamic, data-driven system that maximizes resource recovery, guarantees regulatory compliance, and provides the real-time insights needed to achieve our organizational Zero-Waste and sustainability goals.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {values.map((value, index) => (
            <Card key={index} className="hover-lift card-gradient border-border/50 text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                  {value.icon}
                </div>
                <CardTitle className="text-foreground">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;