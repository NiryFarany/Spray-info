export const getFormations = async () => {
  try {
    //const response = await fetch('http://localhost:5002/api/formations');//ty no mampifandray ny backend sy ny frontend
    const response = await fetch('http://formation-service:5000/api/formations');//@ docker miala ze localhost rehetra
    if (!response.ok) throw new Error('Erreur lors de la récupération des formations');
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

export const getFormationById = async (id) => {
  try {
    //const response = await fetch(`http://localhost:5002/api/formations/${id}`);
    const response = await fetch(`http://formation-service:5000/api/formations/${id}`);//miala localhost pour docker 
    if (!response.ok) throw new Error('Formation non trouvée');
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

//ajout Formation pour Admin
export const addFormation = async (formationData) => {
  try {
    //const response = await fetch('http://localhost:5002/api/formations/', { // an nao zahah probleme nah slash se ra */}
    const response = await fetch('http://formation-service:5000/api/formations/', { //miala localhost
    
      //#endregion
      /* ✅ Solution immédiate

Dans ton fichier formationService.js, modifie cette ligne : 
const response = await fetch('http://localhost:5002/api/formations', {
en 
const response = await fetch('http://localhost:5002/api/formations/', {
Note bien le slash final /.
*/
      //#endregion
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formationData),
    });
    if (!response.ok) throw new Error('Erreur lors de l\'ajout de la formation');
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};


//modifier frontend
export const updateFormation = async (id, formationData) => {
  try {
    //const response = await fetch(`http://localhost:5002/api/formations/${id}`, { //miala localhost pour docker
    const response = await fetch(`http://formation-service:5000/api/formations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formationData),
    });
    if (!response.ok) throw new Error('Erreur lors de la modification de la formation');
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};


//supprimer formation
export const deleteFormation = async (id) => {
  try {
    //const response = await fetch(`http://localhost:5002/api/formations/${id}`, {  pour docker de miala localhost
    const response = await fetch(`http://formation-service:5000/api/formations/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression de la formation');
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

//ViewFormation

/* export const viewFormation = async (id) => {
  try {
    const response = await fetch(`http://localhost:5002/api/formations/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression de la formation');
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}; */

// ✅ Correct (GET = récupérer une formation)
export const viewFormation = async (id) => {
  try {
    //const response = await fetch(`http://localhost:5002/api/formations/${id}`); //miala localhost pour docker
    const response = await fetch(`http://formation-service:5000/api/formations/${id}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération de la formation');
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};
