// Settings.js
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import Container from '@mui/material/Container';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { listAuthors, listSources, listCategories } from '../../services/filter';
import { getUserPreferences, saveUserPreferences } from '../../services/preferences';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const SettingsContent = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: (theme) => theme.spacing(10),
});

const FormContainer = styled('div')({
  width: '50%',
});

const SaveButtonContainer = styled('div')({
  marginTop: '2rem',
});

export default function Settings() {
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [token, setToken] = useState(localStorage.getItem('jwtToken'));

  useEffect(() => {
    // Fetch initial data
    fetchFilterData();
    // Fetch existing user preferences
    fetchExistingUserPreferences();
  }, [token]);

  const fetchFilterData = async () => {
    try {
      const authorsData = await listAuthors(token);
      const sourcesData = await listSources(token);
      const categoriesData = await listCategories(token);

      // Update the state with filter data
      setSelectedAuthors(authorsData || []);
      setSelectedSources(sourcesData || []);
      setSelectedCategories(categoriesData || []);
    } catch (error) {
      console.error('Error fetching filter data:', error);
    }
  };

  const fetchExistingUserPreferences = async () => {
    try {
      const response = await getUserPreferences(token);

      if (response && response.data) {
        const existingPreferences = response.data;

        // Map IDs to items and update the state
        const mapIdsToItems = (items, ids) =>
          items.map((item) => ({ ...item, checked: ids.includes(item.id) }));

        setSelectedAuthors(mapIdsToItems(selectedAuthors, existingPreferences.authors || []));
        setSelectedSources(mapIdsToItems(selectedSources, existingPreferences.sources || []));
        setSelectedCategories(mapIdsToItems(selectedCategories, existingPreferences.categories || []));
      } else {
        console.error('Invalid response or missing data properties in existing user preferences.');
      }
    } catch (error) {
      console.error('Error fetching existing user preferences:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      // Filter selected sources and extract their ids
      const selectedSourcesIds = selectedSources
        .filter((source) => source.checked)
        .map((source) => source.id);

      // Filter selected authors and extract their ids
      const selectedAuthorsIds = selectedAuthors
        .filter((author) => author.checked)
        .map((author) => author.id);

      // Filter selected categories and extract their ids
      const selectedCategoriesIds = selectedCategories
        .filter((category) => category.checked)
        .map((category) => category.id);

      // Save user preferences
      await saveUserPreferences(token, {
        sources: selectedSourcesIds,
        authors: selectedAuthorsIds,
        categories: selectedCategoriesIds,
      });

      // Optional: Show a success message or perform any other actions
      console.log('User preferences saved successfully!');
    } catch (error) {
      console.error('Error saving user preferences:', error);
    }
  };

  return (
    <StyledContainer>
      <Header />
      <SettingsContent>
        <FormContainer>
          {/* Sources Accordion */}
          <Accordion>
            <AccordionSummary>Sources</AccordionSummary>
            <AccordionDetails>
              {selectedSources.map((source) => (
                <FormControlLabel
                  key={source.id}
                  control={
                    <Checkbox
                      checked={source.checked}
                      onChange={() =>
                        setSelectedSources((prev) =>
                          prev.map((item) =>
                            item.id === source.id
                              ? { ...item, checked: !item.checked }
                              : item
                          )
                        )
                      }
                    />
                  }
                  label={source.name}
                />
              ))}
            </AccordionDetails>
          </Accordion>

          {/* Authors Accordion */}
          <Accordion>
            <AccordionSummary>Authors</AccordionSummary>
            <AccordionDetails>
              {selectedAuthors.map((author) => (
                <FormControlLabel
                  key={author.id}
                  control={
                    <Checkbox
                      checked={author.checked}
                      onChange={() =>
                        setSelectedAuthors((prev) =>
                          prev.map((item) =>
                            item.id === author.id
                              ? { ...item, checked: !item.checked }
                              : item
                          )
                        )
                      }
                    />
                  }
                  label={author.name}
                />
              ))}
            </AccordionDetails>
          </Accordion>

          {/* Categories Accordion */}
          <Accordion>
            <AccordionSummary>Categories</AccordionSummary>
            <AccordionDetails>
              {selectedCategories.map((category) => (
                <FormControlLabel
                  key={category.id}
                  control={
                    <Checkbox
                      checked={category.checked}
                      onChange={() =>
                        setSelectedCategories((prev) =>
                          prev.map((item) =>
                            item.id === category.id
                              ? { ...item, checked: !item.checked }
                              : item
                          )
                        )
                      }
                    />
                  }
                  label={category.name}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        </FormContainer>

        {/* Save button */}
        <SaveButtonContainer>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Preferences
          </Button>
        </SaveButtonContainer>
      </SettingsContent>
      <Footer />
    </StyledContainer>
  );
}
