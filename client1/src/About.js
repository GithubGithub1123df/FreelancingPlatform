// import "../styles/About.css";
// import toolset from "../img/toolset.jpg";
function About() {
  return (
    <>
      <div className="about">
        {/* <img src={toolset} alt="tools" /> */}
        <div className="d-flex justify-content-center align-items-center bg-secondary flex-column vh-100">
          <div className="bg-white p-3 rounded-5 w-75 m-5 inline-flex overflow-auto h-75">
            <h2 className="text-center mt-2 mb-3 ">About Us</h2>
            <p>
              Welcome to Connect Service Providers, a platform designed to
              connect clients with talented freelancers in a secure, efficient,
              and user-friendly environment.
            </p>
            <p>
              Our mission is to provide a seamless experience for clients
              seeking top-notch professionals while empowering freelancers to
              showcase their skills and grow their careers. We understand that
              finding the right freelancer for the job can be challenging, which
              is why we’ve developed an advanced matching system to help clients
              easily find qualified freelancers based on job requirements, rank,
              and prior performance.
            </p>
            <p>
              Our platform offers features like instant messaging, real-time
              chat moderation powered by AI, and advanced ranking systems, so
              clients can confidently make informed decisions about the
              freelancers they hire. Our admin dashboard includes a
              comprehensive suite of management tools to ensure smooth
              operations for both freelancers and clients. From monitoring
              rankings to managing freelancer profiles, our platform is designed
              to make the freelance hiring process as transparent and
              user-friendly as possible.
            </p>
            <p>
              To make it easier for clients, we provide personalized
              recommendations based on previous search histories, job
              preferences, and skills, helping to streamline the hiring process
              and ensure that clients find the best match for their projects.
              Our secure, privacy-focused communication channels allow for
              confidential conversations between clients and freelancers, with
              no admin access to private messages. Whether you’re a client
              looking for a skilled professional or a freelancer eager to take
              on exciting projects, we’re here to make that connection
              happen—efficiently, securely, and with a focus on quality. Join us
              today and take your projects to the next level!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
