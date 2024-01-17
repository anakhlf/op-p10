import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";
import Events from "../../containers/Events"; 
import { api, DataProvider } from "../../contexts/DataContext";


const data =  {
    "events": [
        {
            "id": 1,
            "type": "conférence",
            "date": "2022-04-29T20:28:45.744Z",
            "title": "User&product MixUsers",
            "cover": "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png",
            "description": "Présentation des nouveaux usages UX.",
            "nb_guesses": 900,
            "periode": "14-15-16 Avril",
            "prestations": [
                "1 espace d’exposition",
                "1 scéne principale",
                "1 espace de restaurations"
            ]
        },
        {
            "id": 2,
            "type": "expérience digitale",
            "date": "2022-01-29T20:28:45.744Z",
            "title": "#DigitonPARIS",
            "cover": "/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png",
            "description": "Présentation des outils analytics aux professionnels du secteur ",
            "nb_guesses": 1300,
            "periode": "24-25-26 Février",
            "prestations": [
                "1 espace d’exposition",
                "1 scéne principale",
                "1 site web dédié"
            ]
        },
        {
            "id": 3,
            "type": "conférence",
            "date": "2022-03-29T20:28:45.744Z",
            "title": "Conférence &co-responsable",
            "cover": "/images/chuttersnap-Q_KdjKxntH8-unsplash.png",
            "description": "Débats et échanges autour des collaborations eco-responsable.",
            "nb_guesses": 600,
            "periode": "24-25-26 Février",
            "prestations": [
                "1 scéne principale",
                "1 espaces de restaurations",
                "1 site web dédié"
            ]
        },
        {
            "id": 4,
            "type": "conférence",
            "date": "2022-08-29T20:28:45.744Z",
            "title": "Conférence #productCON",
            "cover": "/images/headway-F2KRf_QfCqw-unsplash.png",
            "description": "Présentation des outils analytics aux professionnels du secteur ",
            "nb_guesses": 1300,
            "periode": "24-25-26 Février",
            "prestations": [
                "1 espace d’exposition",
                "1 scéne principale",
                "2 espaces de restaurations",
                "1 site web dédié"
            ]
        },
        {
            "id": 5,
            "type": "expérience digitale",
            "date": "2022-04-29T20:28:45.744Z",
            "title": "Conférence #productCON",
            "cover": "/images/pablo-heimplatz-ZODcBkEohk8-unsplash.png",
            "description": "Présentation des outils analytics aux professionnels du secteur ",
            "nb_guesses": 1300,
            "periode": "24-25-26 Février",
            "prestations": [
                "1 espace d’exposition",
                "1 scéne principale",
                "2 espaces de restaurations",
                "1 site web dédié"
            ]
        },
    ]  

}


describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home>
        <DataProvider>
          <Events />
        </DataProvider>
        
        </Home>);



      
      fireEvent.click(await screen.findByText("Envoyer"));
  
      await screen.findByText("En cours"); // Attend que le message "En cours" apparaisse si nécessaire
      await waitFor(() => screen.findByText("Message envoyé !"), { timeout: 3000 });
    });

  })});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    expect(await screen.findByText("User&product MixUsers")).toBeInTheDocument();
    expect(await screen.findByText("Conférence &co-responsable")).toBeInTheDocument();
    expect(await screen.findByText("#DigitonPARIS")).toBeInTheDocument();
    const elementsWithSameTitle = await screen.findAllByText("Conférence #productCON"); 
    expect(elementsWithSameTitle).toHaveLength(3);
});


  it("affiche une liste de personnes", () => {
    render(<Home />);
    expect(screen.getByText("Samira")).toBeInTheDocument();
    expect(screen.getByText("Jean-baptiste")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Luís")).toBeInTheDocument();
    expect(screen.getByText("Christine")).toBeInTheDocument();
    expect(screen.getByText("Isabelle")).toBeInTheDocument();
    
  });
  
  it("a footer is displayed", () => {
    render(<Home />);
    expect(screen.getByText("Contactez-nous")).toBeInTheDocument();
    expect(screen.getByText("45 avenue de la République, 75000 Paris")).toBeInTheDocument();
    expect(screen.getByText("01 23 45 67 89")).toBeInTheDocument();
    expect(screen.getByText("contact@77events.com")).toBeInTheDocument();
  })

  it("an event card, with the last event, is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    const sortedEvents = data.events.sort((a, b) => new Date(b.date) - new Date(a.date));
    const lastProject = sortedEvents[0];

    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    // Wait for the last event's title to appear in the document
    const allEventElementsWithTitle = await screen.findAllByText(lastProject.title);
    expect(allEventElementsWithTitle[0]).toBeInTheDocument();
    expect(allEventElementsWithTitle[0]).toHaveTextContent(lastProject.title);
  });
});