import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  VStack, 
  Heading, 
  Text, 
  useToast,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { FiUser, FiCalendar, FiDollarSign } from 'react-icons/fi';

const Ajout = () => {
  const [nom, setNom] = useState('');
  const [jours, setJours] = useState(0);
  const [tarifJ, setTarifJ] = useState(0);
  const toast = useToast(); // Pour des notifications plus jolies que du texte simple

  const enregistrer = (e) => {
    e.preventDefault();
    
    // Simulation de l'appel API
    console.log({ nom, jours, tarifJ });

    // Notification de succès
    toast({
      title: "Insertion réussie",
      description: `Le visiteur ${nom} a été ajouté.`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  return (
    <Box maxW="500px" mx="auto" mt={5}>
      <Heading as="h2" size="lg" mb={6} color="blue.700">
        Ajouter un Visiteur
      </Heading>

      <form onSubmit={enregistrer}>
        <VStack spacing={5}>
          {/* CHAMP NOM */}
          <FormControl isRequired>
            <FormLabel>Nom du visiteur</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiUser color="gray.300" />
              </InputLeftElement>
              <Input 
                type="text" 
                placeholder="Ex: Jean Dupont" 
                onChange={e => setNom(e.target.value)} 
                focusBorderColor="blue.400"
              />
            </InputGroup>
          </FormControl>

          {/* CHAMP NOMBRE DE JOURS */}
          <FormControl isRequired>
            <FormLabel>Nombre de jours</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiCalendar color="gray.300" />
              </InputLeftElement>
              <Input 
                type="number" 
                placeholder="0" 
                onChange={e => setJours(Number(e.target.value))} 
                focusBorderColor="blue.400"
              />
            </InputGroup>
          </FormControl>

          {/* CHAMP TARIF JOURNALIER */}
          <FormControl isRequired>
            <FormLabel>Tarif journalier (Ar)</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiDollarSign color="gray.300" />
              </InputLeftElement>
              <Input 
                type="number" 
                placeholder="Ex: 50000" 
                onChange={e => setTarifJ(Number(e.target.value))} 
                focusBorderColor="blue.400"
              />
            </InputGroup>
          </FormControl>

          {/* BOUTON D'ACTION */}
          <Button 
            type="submit" 
            colorScheme="blue" 
            size="lg" 
            w="full" 
            mt={4}
            boxShadow="lg"
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
          >
            Enregistrer le visiteur
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Ajout;