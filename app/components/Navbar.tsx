"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Link from "@/app/components/Link";
import Logo from "./Logo";

const LEVELS = [
  { id: "n5", label: "N5" },
  { id: "n4", label: "N4" },
  { id: "n3", label: "N3" },
  { id: "n2", label: "N2" },
  { id: "n1", label: "N1" },
] as const;

export default function Navbar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(8px)",
        color: "text.primary",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "lg",
          mx: "auto",
          width: "100%",
          px: { xs: 2, sm: 3 },
          minHeight: "64px !important",
        }}
      >
        {/* Logo */}
        <ButtonBase
          component={Link}
          href="/"
          sx={{
            borderRadius: 2,
            px: 1,
            py: 0.5,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Logo size={30} />
          <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1 }}>
            漢字
            <Box component="span" sx={{ color: "text.secondary", fontWeight: 400, fontSize: "0.875rem", ml: 0.25 }}>
              カード
            </Box>
          </Typography>
        </ButtonBase>

        <Box sx={{ flexGrow: 1 }} />

        {/* Level links */}
        <Stack direction="row" spacing={0.5}>
          {LEVELS.map(({ id, label }) => (
            <Button
              key={id}
              component={Link}
              href={`/level/${id}`}
              color="inherit"
              size="small"
              sx={{ color: "text.secondary", minWidth: 0, px: { xs: 1, sm: 1.5 } }}
            >
              {label}
            </Button>
          ))}
          <Button
            component={Link}
            href="/level/all"
            color="inherit"
            size="small"
            sx={{ color: "text.secondary", minWidth: 0, px: { xs: 1, sm: 1.5 } }}
          >
            All
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
