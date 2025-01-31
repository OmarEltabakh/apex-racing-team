import everLogo from "../../Assets/competetionSection/Ever.webp"
import globalLogo from "../../Assets/competetionSection/Global.webp"
import shellLogo from "../../Assets/competetionSection/shell.webp"
import formulaLogo from "../../Assets/competetionSection/Formula.webp"



export const competitionsData = [
    {
        id: 1, name: "Formula", img: formulaLogo, desc: `
        
The Operations Team ensures efficiency by managing resources and tasks.



`
, DescriptionInDepth: "Formula Student UK is one of the world's leading engineering competitions, held annually under the auspices of the Institution of Mechanical Engineers (IMechE). The competition challenges student teams to design, manufacture, test, and race single-seater race cars. FSUK emphasizes developing students' practical engineering skills while encouraging innovation, sustainability, and cost-effectiveness. Teams compete in various categories, including design, cost and manufacturing, and overall performance, with a focus on testing the car's speed, efficiency, and handling capabilities."
    },
    { id: 2, name: "Ever", img: everLogo, desc: "The Egypt Rally fosters innovation in sustainable and electric vehicles.", DescriptionInDepth: "EVER, or Egypt Rally, is an annual competition organized by the Arab Academy for Science, Technology, and Maritime Transport. The event promotes innovation in the field of electric and sustainable vehicles. Teams from various universities compete to demonstrate their engineering solutions for clean energy and sustainability. The competition encourages participants to develop and showcase advanced technologies in electric vehicles while focusing on energy efficiency, endurance, and performance. It also includes challenges like business plan presentations and social media campaigns to assess the overall impact and outreach of each team's project." },
    { id: 3, name: "Shell", img: shellLogo, desc: "Design an efficient vehicle that maximizes distance while minimizing energy.", DescriptionInDepth: "The Shell Eco-marathon is a global competition where students design and build vehicles that can travel the farthest distance using the least amount of energy or fuel. The competition is designed to inspire innovation in energy-efficient transportation and encourages participants to explore alternative energy sources for vehicles. Teams compete to develop vehicles that maximize efficiency while maintaining safety and performance standards. The competition features different challenges, including the Future Rider challenge, where the focus is on building the most energy-efficient prototype." },
    { id: 4, name: "Globla", img: globalLogo, desc: "The Global Electric Vehicle Challenge fosters innovation in designing and building EVs.", DescriptionInDepth: "The Global Electric Vehicle Challenge (GEVC) is an international competition focused on the design, manufacturing, and operation of electric vehicles. It promotes engineering innovation and sustainable solutions in the automotive industry. The challenge encourages students to develop their skills in electric vehicle design and manufacturing while pushing the boundaries of what is possible in sustainable transportation. GEVC aims to inspire future engineers to create practical solutions to reduce the environmental impact of transportation through the development of advanced electric vehicles." },
]
