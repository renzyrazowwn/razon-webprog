import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../../services/ArticleService';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DashArticleListPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newArticle, setNewArticle] = useState({
    title: '',
    name: '',
    imageUrl: '',
    content: '',
    isPublished: true,
  });

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticles(data.articles || data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpen = () => {
    setIsEditing(false);
    setEditArticleId(null);
    setNewArticle({
      title: '',
      name: '',
      imageUrl: '',
      content: '',
      isPublished: true,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditArticleId(null);
  };

  const handleEdit = (id) => {
    const articleToEdit = articles.find((article) => article._id === id);
    if (articleToEdit) {
      setNewArticle({
        title: articleToEdit.title || '',
        name: articleToEdit.name || '',
        imageUrl: articleToEdit.imageUrl || '',
        content: Array.isArray(articleToEdit.content)
          ? articleToEdit.content.join('\n')
          : articleToEdit.content || '',
        isPublished: articleToEdit.isPublished,
      });
      setEditArticleId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleSaveArticle = async () => {
    try {
      const articleData = {
        title: newArticle.title,
        name: newArticle.name,
        imageUrl: newArticle.imageUrl,
        content: newArticle.content
          .split('\n')
          .map((paragraph) => paragraph.trim())
          .filter((paragraph) => paragraph !== ''),
        isPublished: newArticle.isPublished,
      };

      if (isEditing) {
        await updateArticle(editArticleId, articleData);
        setSuccessMessage('Article updated successfully!');
      } else {
        await createArticle(articleData);
        setSuccessMessage('Article created successfully!');
      }
      loadArticles();
      handleClose();
    } catch (error) {
      console.error('Error saving article:', error);
      setErrorMessage(
        error.response?.data?.message || 'Failed to save article.'
      );
    }
  };

  const handleDeleteArticle = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this article?'
    );

    if (!confirmDelete) return;

    try {
      await deleteArticle(id);

      setSuccessMessage('Article deleted successfully!');
      loadArticles();
    } catch (error) {
      console.error('Error deleting article:', error);

      setErrorMessage(
        error.response?.data?.message || 'Failed to delete article.'
      );
    }
  };

  const handleTogglePublished = async (id, isPublished) => {
    try {
      await updateArticle(id, { isPublished: !isPublished });
      loadArticles();
    } catch (error) {
      console.error('Error updating article status:', error);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const search = searchTerm.toLowerCase();
    const contentText = Array.isArray(article.content)
      ? article.content.join(' ')
      : article.content || '';
    const matchesSearch =
      (article.title || '').toLowerCase().includes(search) ||
      (article.name || '').toLowerCase().includes(search) ||
      (article.imageUrl || '').toLowerCase().includes(search) ||
      contentText.toLowerCase().includes(search);
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && article.isPublished) ||
      (statusFilter === 'draft' && !article.isPublished);
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'name', headerName: 'Name/Slug', flex: 1 },
    { field: 'imageUrl', headerName: 'Image URL', flex: 1 },
    {
      field: 'isPublished',
      headerName: 'Status',
      flex: 1,
      headerAlign: 'center', 
      align: 'center',
      renderCell: (params) => (
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 100,
            height: 32,
            px: 2,
            borderRadius: '999px',
            border: '2px solid',
            borderColor: params.row.isPublished ? '#166534' : '#52525b',
            bgcolor: params.row.isPublished ? '#dcfce7' : '#f4f4f5',
            color: params.row.isPublished ? '#166534' : '#3f3f46',
            fontWeight: 900,
            fontSize: 12,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {params.row.isPublished ? 'Published' : 'Draft'}
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      sortable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 1.5,
            height: '100%',
          }}
        >
          <Button
            onClick={() => handleEdit(params.row._id)}
            sx={{
              minWidth: 72,
              height: 38,
              borderRadius: '999px',
              bgcolor: '#18181b',
              color: '#ffffff',
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: '0.12em',
              px: 2,
              '&:hover': {
                bgcolor: '#7c3aed',
              },
            }}
          >
            Edit
          </Button>

          <Button
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteArticle(params.row._id)}
            sx={{
              borderRadius: '999px',
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: '0.12em',
            }}
          >
            Delete
          </Button>

          <Switch
            checked={params.row.isPublished}
            onChange={() =>
              handleTogglePublished(params.row._id, params.row.isPublished)
            }
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#7c3aed',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                bgcolor: '#c4b5fd',
                opacity: 1,
              },
              '& .MuiSwitch-track': {
                bgcolor: '#d4d4d8',
                opacity: 1,
              },
            }}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f4f4f5',
        color: '#18181b',
        width: '100%',
        minWidth: 0,
        overflowX: 'hidden',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3, width: '100%', minWidth: 0 }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h4" fontWeight={900} gutterBottom>
            Articles
          </Typography>
          <Typography sx={{ color: '#52525b', whiteSpace: 'nowrap' }}>
            Manage published articles, drafts, and content for VibeFitness.
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
          }}
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddCircleIcon />}
            onClick={handleOpen}
            sx={{
              border: '2px solid #18181b',
              borderRadius: '999px',
              bgcolor: '#7c3aed',
              color: '#ffffff',
              fontSize: 12,
              fontWeight: 900,
              px: 2.5,
              minWidth: 145,
              height: 44,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              boxShadow: 'none',
              flexShrink: 0,
              '&:hover': {
                bgcolor: '#18181b',
                color: '#ffffff',
                border: '2px solid #18181b',
                boxShadow: 'none',
              },
            }}
          >
            Add Article
          </Button>
        </Box>
      </Stack>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: '18px' }}>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: '18px' }}>
          {errorMessage}
        </Alert>
      )}

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', md: 'center' }}
        sx={{ mb: 2 }}
      >
        <TextField
          fullWidth
          placeholder="Search articles"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '18px',
              bgcolor: '#ffffff',
            },
          }}
        />
        <TextField
          select
          fullWidth
          label="Filter by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '18px',
              bgcolor: '#ffffff',
            },
          }}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="published">Published</MenuItem>
          <MenuItem value="draft">Draft</MenuItem>
        </TextField>
      </Stack>
      <Typography
        sx={{
          mb: 2,
          color: '#71717a',
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        Showing {filteredArticles.length} of {articles.length} articles
      </Typography>
      <Box
        sx={{
          width: '100%',
          minWidth: 0,
          overflowX: 'auto',
          backgroundColor: '#fff',
          borderRadius: '18px',
          mb: 5,
        }}
      >
        <DataGrid
          rows={filteredArticles}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
          pageSizeOptions={[10, 20, 50]}
          disableRowSelectionOnClick
          autoHeight
          sx={{
            width: '100%',
            minWidth: 0,
            border: 'none',
            backgroundColor: '#fff',
            '& .MuiDataGrid-main': { borderRadius: '18px' },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#fff',
              borderBottom: '2px solid #18181b',
            },
            '& .MuiDataGrid-columnHeader': { outline: 'none !important' },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 900,
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#18181b',
            },
            '& .MuiDataGrid-columnSeparator': { display: 'none' },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #e4e4e7',
              outline: 'none !important',
            },
            '& .MuiDataGrid-row:hover': { backgroundColor: '#f5f3ff' },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '1px solid #e4e4e7',
            },
          }}
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Paper sx={modalStyle}>
          <Typography variant="h6" fontWeight={900} mb={3}>
            {isEditing ? 'Edit Article' : 'Add New Article'}
          </Typography>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Article Title"
              value={newArticle.title}
              onChange={(e) =>
                setNewArticle({ ...newArticle, title: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Slug/Name"
              value={newArticle.name}
              onChange={(e) =>
                setNewArticle({ ...newArticle, name: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Image URL"
              value={newArticle.imageUrl}
              onChange={(e) =>
                setNewArticle({ ...newArticle, imageUrl: e.target.value })
              }
            />
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Content"
              value={newArticle.content}
              onChange={(e) =>
                setNewArticle({ ...newArticle, content: e.target.value })
              }
            />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Published Status</Typography>
              <Switch
                checked={newArticle.isPublished}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, isPublished: e.target.checked })
                }
              />
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={handleSaveArticle}>
                Save
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Modal>
    </Box>
  );
};

export default DashArticleListPage;