import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" color="text.disabled">
          <Box component="span" sx={{ color: "text.secondary", fontWeight: 500 }}>漢字カード</Box>
          {" — "}Japanese kanji flashcards · JLPT N5–N1
        </Typography>
      </Box>
    </Box>
  );
}
