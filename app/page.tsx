"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import { useTheme, alpha } from "@mui/material/styles";
import Link from "@/app/components/Link";
import { kanjiList } from "@/app/data/kanji";

const LEVELS = [
  { id: "n5", label: "N5", description: "Beginner",          color: "success" as const, decor: "易" },
  { id: "n4", label: "N4", description: "Elementary",        color: "info"    as const, decor: "初" },
  { id: "n3", label: "N3", description: "Intermediate",      color: "warning" as const, decor: "中" },
  { id: "n2", label: "N2", description: "Upper Intermediate", color: "secondary" as const, decor: "上" },
  { id: "n1", label: "N1", description: "Advanced",          color: "error"   as const, decor: "難" },
] as const;

export default function Home() {
  const counts = Object.fromEntries(
    LEVELS.map(({ id }) => [
      id,
      kanjiList.filter((k) => k.jlpt === id.toUpperCase()).length,
    ])
  );

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          漢字カード
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {kanjiList.length} kanji across all JLPT levels — choose a level to study
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" },
          gap: 2,
        }}
      >
        {LEVELS.map(({ id, label, description, color, decor }) => (
          <LevelCard
            key={id}
            href={`/level/${id}`}
            label={label}
            description={description}
            color={color}
            decor={decor}
            count={counts[id] ?? 0}
          />
        ))}
        <LevelCard
          href="/level/all"
          label="All"
          description="All Levels"
          color="primary"
          decor="全"
          count={kanjiList.length}
        />
      </Box>
    </Container>
  );
}

function LevelCard({
  href,
  label,
  description,
  color,
  decor,
  count,
}: {
  href: string;
  label: string;
  description: string;
  color: "success" | "info" | "warning" | "secondary" | "error" | "primary";
  decor: string;
  count: number;
}) {
  const theme = useTheme();
  const palette = theme.palette[color];

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: alpha(palette.main, 0.08),
        border: "1px solid",
        borderColor: alpha(palette.main, 0.2),
        position: "relative",
        overflow: "hidden",
        transition: "transform 200ms, box-shadow 200ms, background-color 200ms",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: `0 4px 20px ${alpha(palette.main, 0.2)}`,
          bgcolor: alpha(palette.main, 0.12),
        },
        "&:active": { transform: "translateY(0)" },
      }}
    >
      <CardActionArea
        component={Link}
        href={href}
        sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-start" }}
      >
        {/* Decorative background character */}
        <Box
          sx={{
            position: "absolute",
            right: -12,
            bottom: -20,
            fontFamily: "serif",
            fontSize: "7rem",
            lineHeight: 1,
            opacity: 0.07,
            color: palette.main,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {decor}
        </Box>

        {/* Top row */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <Box
            sx={{
              bgcolor: alpha(palette.main, 0.15),
              color: palette.dark ?? palette.main,
              borderRadius: 999,
              px: 1.5,
              py: 0.5,
              fontSize: "0.8125rem",
              fontWeight: 700,
            }}
          >
            {label}
          </Box>
          <Box
            component="span"
            sx={{
              color: palette.main,
              opacity: 0.7,
              fontSize: "1.1rem",
              transition: "transform 200ms",
              ".MuiCardActionArea-root:hover &": { transform: "translateX(4px)" },
            }}
          >
            →
          </Box>
        </Box>

        {/* Description + count */}
        <Box>
          <Typography variant="subtitle1" fontWeight={500} sx={{ color: palette.dark ?? palette.main }}>
            {description}
          </Typography>
          <Typography variant="caption" color="text.secondary">{count} kanji</Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
