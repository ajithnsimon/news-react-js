// Feed.js
import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Post from "./Post";
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import { listArticles } from '../../services/feed';
import { listAuthors, listSources, listCategories } from '../../services/filter';
import { Button, IconButton } from "@mui/material";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const FeedContent = styled("div")({
  flex: 1,
  marginBottom: "10rem",
});

const Sidebar = styled("div")({
  marginRight: (theme) => theme.spacing(4),
});

const FilterAccordion = ({ title, options, filter, setFilter, onChange }) => (
  <Accordion onChange={onChange}>
    <AccordionSummary>{title}</AccordionSummary>
    <AccordionDetails>
      {options.map((option) => (
        <FormControlLabel
          key={option.id}
          control={
            <Checkbox
              checked={filter.includes(option.id)}
              onChange={() =>
                setFilter((prev) =>
                  prev.includes(option.id)
                    ? prev.filter((item) => item !== option.id)
                    : [...prev, option.id]
                )
              }
            />
          }
          label={option?.name}
        />
      ))}
    </AccordionDetails>
  </Accordion>
);

const SearchInput = ({ value, onChange, onClear }) => (
  <TextField
    label="Search"
    variant="outlined"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    InputProps={{
      endAdornment: (
        <IconButton onClick={onClear} size="small">
          {/* Add clear icon or any action you want */}
        </IconButton>
      ),
    }}
  />
);

export default function Feed() {
  const postsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [authors, setAuthors] = useState([]);
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));
  const [authorFilter, setAuthorFilter] = useState([]);
  const [sourceFilter, setSourceFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchArticles = async (filters = {}) => {
    try {
      if (token) {
        const result = await listArticles(token, { ...filters, page: currentPage });
        setArticles(result.articles.data);
        setTotalPages(result.articles.last_page);
      } else {
        console.error('No token found for list articles');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      } else {
        console.error('Error fetching articles:', error);
      }
    }
  };

  const fetchFilters = async () => {
    try {
      const authorsData = await listAuthors(token);
      const sourcesData = await listSources(token);
      const categoriesData = await listCategories(token);

      setAuthors(authorsData);
      setSources(sourcesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching filter data:', error);
    }
  };

  useEffect(() => {
    fetchFilters();
    fetchArticles();
  }, [currentPage]); // Make sure to include currentPage as a dependency

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleFilterChange = () => {
    fetchFilteredArticles();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchFilteredArticles();
  };

  const handleSearchClear = () => {
    setSearchQuery("");
    fetchFilteredArticles();
  };

  const handleFilterSubmit = () => {
    // Prepare filters object with selected values
    const filters = {
      search: searchQuery,
      sources: sourceFilter,
      categories: categoryFilter,
      authors: authorFilter,
      date: selectedDate,
    };

    // Call API with filters
    fetchFilteredArticles(filters);
  };

  const fetchFilteredArticles = () => {
    fetchArticles({
      search: searchQuery,
      sources: sourceFilter,
      categories: categoryFilter,
      authors: authorFilter,
      date: selectedDate,
    });
  };

  return (
    <StyledContainer>
      <Header />
      <FeedContent>
        <Sidebar>
          {authors.length ? (
            <FilterAccordion
              title="Authors"
              options={authors}
              filter={authorFilter}
              setFilter={setAuthorFilter}
              onChange={handleFilterChange}
            />
          ) : (
            <></>
          )}
          {sources.length ? (
            <FilterAccordion
              title="Sources"
              options={sources}
              filter={sourceFilter}
              setFilter={setSourceFilter}
              onChange={handleFilterChange}
            />
          ) : (
            <></>
          )}
          {categories.length ? (
            <FilterAccordion
              title="Categories"
              options={categories}
              filter={categoryFilter}
              setFilter={setCategoryFilter}
              onChange={handleFilterChange}
            />
          ) : (
            <></>
          )}
        </Sidebar>
        <div>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={handleSearchClear}
          />
          <Button variant="contained" onClick={handleFilterSubmit}>
            Apply Filters
          </Button>
          {articles.length ? (
            articles.map((article, index) => (
              <Post article={article} key={index} />
            ))
          ) : (
            "No articles found"
          )}
          <Stack spacing={2} justifyContent="center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>
      </FeedContent>
      <Footer />
    </StyledContainer>
  );
}
