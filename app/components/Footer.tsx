import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          maxWidth: "lg",
          px: { xs: 2, sm: 3 },
          py: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="caption" color="text.disabled">
          Built with <Box component="span" sx={{ color: "error.main" }}>♥</Box> for Japanese learners
        </Typography>

        <IconButton
          component="a"
          href="https://github.com/prinkrz/kanji-card"
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          aria-label="GitHub source code"
          sx={{ color: "text.disabled", "&:hover": { color: "text.secondary" } }}
        >
          <GitHubIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
