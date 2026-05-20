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
          py: 3,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          <Box component="span" sx={{ color: "text.primary", fontWeight: 500 }}>
            漢字カード
          </Box>
          {" "}— Japanese kanji flashcards
        </Typography>
        <Typography variant="caption" color="text.disabled">
          Readings and compounds based on JLPT N5–N1 curriculum
        </Typography>
      </Box>
    </Box>
  );
}
