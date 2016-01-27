using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Integrated_B2B.Startup))]
namespace Integrated_B2B
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
