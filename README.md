# InfyTrade
InfyTrade is a web based trading platform with advanced UI and Data analytics capable of creating custom made ML models and visualizations.


## Advantages of InfyTrade:

- enhanced UI customization with drag and drop options.
- real time data analytics with the help of different types of charts and plots.
- creating mulitple dashboard and sharing of the dashboard either publicly/privately which helps people who doesn't have much idea about the trading.
- pre-defined ML model templates that can be added to any of the stock/forex/crypto/ F & O.
- custom made ML models where InfyTrade gives access to real time code editor and collabrator option.
- Rankings of the Traders [ traders who want to be public and did consent to show their portfolio ]
- connections, community and marketplace for the traders


### Probable Tech Stack:

- Design: Figma 
- Frontend : ReactJS (frontend Application) , ChartJS (for visualizations), TailwindCSS/DaisyUI for faster styling.
- Backend: PostgresSQL ( DB ), python [ flask/django for backend ], APIs default from the echios.
- Integration: docker for containeriaztion and deploying to the aws instance.

### Intial Workload:

- creating a cron job for storing the APIs response in the DB for future ML models ( can't go empty handed, should provide some for the users in the Demo mvp )
- designing the UI of the website using figma ( taking references from existing wireframes for faster productivity )
- Assigning the JIRA ticket and deciding the roles of the work.
